import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Envio } from "./Envio.js";
import { Direccion } from "./Direccion.js";

@Entity("clientes")
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    nombre!: string;

    @Column({ type: "varchar", length: 50, default: "ACTIVO" })
    estado!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, name: "limite_credito", default: 0 })
    limite_credito!: number;

    @OneToMany(() => Envio, (envio) => envio.cliente)
    envios!: Envio[];

    @OneToMany(() => Direccion, (direccion) => direccion.cliente)
    direcciones!: Direccion[];
}