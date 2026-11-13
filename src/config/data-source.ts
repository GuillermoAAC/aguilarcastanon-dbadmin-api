import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";
import { Cliente } from "../entity/Cliente.js";
import { Direccion } from "../entity/Direccion.js";
import { Envio } from "../entity/Envio.js";
import { Paquete } from "../entity/Paquete.js";
import { Almacen } from "../entity/Almacen.js";
import { HistorialRastreo } from "../entity/HistorialRastreo.js";
import { AuditoriaEnvio } from "../entity/AuditoriaEnvio.js";

export const AppDataSource = new DataSource({
    type: "mysql", // O "mariadb"
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "secret",
    database: process.env.DB_NAME || "ventas_db",
    synchronize: false, // Se mantiene false ya que las tablas fueron creadas previamente por SQL
    logging: true,
    entities: [
        Categoria,
        Producto,
        Venta,
        DetalleVenta,
        Cliente,
        Direccion,
        Envio,
        Paquete,
        Almacen,
        HistorialRastreo,
        AuditoriaEnvio
    ],
    subscribers: [],
    migrations: [],
});

