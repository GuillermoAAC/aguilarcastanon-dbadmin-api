import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Envio } from './Envio.js';

@Entity('auditoria_envios')
export class AuditoriaEnvio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  envio_id!: number;

  @ManyToOne(() => Envio, envio => envio.auditorias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_anterior!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_nuevo!: number;

  @Column({ type: 'varchar', length: 100 })
  usuario!: string;

  @Column({ type: 'datetime' })
  fecha_modificacion!: Date;
}