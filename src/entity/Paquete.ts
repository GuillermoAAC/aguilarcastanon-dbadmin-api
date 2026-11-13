import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Envio } from './Envio.js';
import { Almacen } from './Almacen.js';

@Entity('paquetes')
export class Paquete {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  envio_id!: number;

  @ManyToOne(() => Envio, envio => envio.paquetes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @Column({ type: 'int' })
  almacen_id!: number;

  @ManyToOne(() => Almacen, almacen => almacen.paquetes)
  @JoinColumn({ name: 'almacen_id' })
  almacen!: Almacen;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  peso!: number;

  @Column({ type: 'varchar', length: 50 })
  dimensiones!: string;

  @Column({ type: 'text' })
  contenido!: string;
}