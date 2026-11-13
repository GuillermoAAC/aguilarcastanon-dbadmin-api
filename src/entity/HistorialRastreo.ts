import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Envio } from './Envio.js';

@Entity('historial_rastreo')
export class HistorialRastreo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  envio_id!: number;

  @ManyToOne(() => Envio, envio => envio.historialRastreo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @Column({ type: 'datetime' })
  fecha!: Date;

  @Column({ type: 'varchar', length: 150 })
  ubicacion_actual!: string;

  @Column({ type: 'varchar', length: 50 })
  estado_evento!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;
}