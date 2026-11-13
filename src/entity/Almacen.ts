import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Paquete } from './Paquete.js';

@Entity('almacenes')
export class Almacen {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 150 })
  ubicacion!: string;

  @Column({ type: 'int' })
  capacidad_maxima!: number;

  @OneToMany(() => Paquete, paquete => paquete.almacen)
  paquetes!: Paquete[];
}