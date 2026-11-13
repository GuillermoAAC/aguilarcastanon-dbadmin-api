import { AppDataSource } from "../config/data-source.js";
import { Envio } from "../entity/Envio.js";

export class EnvioRepository {
    private get repository() {
        return AppDataSource.getRepository(Envio);
    }

    async findAll(): Promise<Envio[]> {
        return await this.repository.find({
            relations: ["cliente", "direccionOrigen", "direccionDestino", "paquetes"]
        });
    }

    async findById(id: number): Promise<Envio | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["cliente", "direccionOrigen", "direccionDestino", "paquetes", "historialRastreo", "auditorias"]
        });
    }

    async findActiveEnvios(): Promise<Envio[]> {
        return await this.repository.createQueryBuilder('envio')
            .leftJoinAndSelect('envio.cliente', 'cliente')
            .leftJoinAndSelect('envio.paquetes', 'paquetes')
            .where('envio.estado_global != :estado', { estado: 'CANCELADO' })
            .getMany();
    }

    async findByClienteId(clienteId: number): Promise<Envio[]> {
        return await this.repository.find({
            where: { cliente_id: clienteId },
            relations: ["direccionOrigen", "direccionDestino", "paquetes", "historialRastreo"]
        });
    }

    async save(envio: Envio): Promise<Envio> {
        return await this.repository.save(envio);
    }

    // <-- MÉTODO CORREGIDO PARA MAPEAR EXPLÍCITAMENTE LOS IDs Y PAQUETES -->
    async create(envioData: any): Promise<Envio> {
        const envio = this.repository.create({
            cliente_id: envioData.cliente_id,
            direccion_origen_id: envioData.direccion_origen_id,
            direccion_destino_id: envioData.direccion_destino_id,
            costo_total: envioData.costo_total,
            fecha: envioData.fecha || new Date(),
            estado_global: envioData.estado_global || 'REGISTRADO',
            paquetes: envioData.paquetes
        });
        return await this.repository.save(envio);
    }

    async update(id: number, envioData: Partial<Envio>): Promise<Envio | null> {
        await this.repository.update(id, envioData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}

export const envioRepository = new EnvioRepository();