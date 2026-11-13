import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from './Cliente.js';
import { Envio } from './Envio.js';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  cliente_id!: number;

  @ManyToOne(() => Cliente, cliente => cliente.direcciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @Column({ type: 'varchar', length: 150 })
  calle!: string;

  @Column({ type: 'varchar', length: 100 })
  ciudad!: string;

  @Column({ type: 'varchar', length: 100 })
  estado_provincia!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo_postal!: string;

  @OneToMany(() => Envio, envio => envio.direccionOrigen)
  enviosOrigen!: Envio[];

  @OneToMany(() => Envio, envio => envio.direccionDestino)
  enviosDestino!: Envio[];
}