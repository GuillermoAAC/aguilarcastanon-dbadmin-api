import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";
import { Direccion } from "./Direccion.js";
import { Paquete } from "./Paquete.js";
import { HistorialRastreo } from "./HistorialRastreo.js";
import { AuditoriaEnvio } from "./AuditoriaEnvio.js";

@Entity("envios")
export class Envio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int", name: "cliente_id" })
    cliente_id!: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.envios)
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;

    @Column({ type: "int", name: "direccion_origen_id" })
    direccion_origen_id!: number;

    @ManyToOne(() => Direccion, (direccion) => direccion.enviosOrigen)
    @JoinColumn({ name: "direccion_origen_id" })
    direccionOrigen!: Direccion;

    @Column({ type: "int", name: "direccion_destino_id" })
    direccion_destino_id!: number;

    @ManyToOne(() => Direccion, (direccion) => direccion.enviosDestino)
    @JoinColumn({ name: "direccion_destino_id" })
    direccionDestino!: Direccion;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    costo_total!: number;

    @Column({ type: "datetime" })
    fecha!: Date;

    @Column({ type: "varchar", length: 50 })
    estado_global!: string;

    @OneToMany(() => Paquete, (paquete) => paquete.envio, { cascade: true })
    paquetes!: Paquete[];

    @OneToMany(() => HistorialRastreo, (rastreo) => rastreo.envio)
    historialRastreo!: HistorialRastreo[];

    @OneToMany(() => AuditoriaEnvio, (auditoria) => auditoria.envio)
    auditorias!: AuditoriaEnvio[];
}