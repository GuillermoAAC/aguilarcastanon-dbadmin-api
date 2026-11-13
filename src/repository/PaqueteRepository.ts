import { AppDataSource } from "../config/data-source.js";
import { Paquete } from "../entity/Paquete.js";

export class PaqueteRepository {
    private get repository() {
        return AppDataSource.getRepository(Paquete);
    }

    async findAll(): Promise<Paquete[]> {
        return await this.repository.find({
            relations: ["envio", "almacen"]
        });
    }

    async findById(id: number): Promise<Paquete | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["envio", "almacen"]
        });
    }

    async save(paquete: Paquete): Promise<Paquete> {
        return await this.repository.save(paquete);
    }

    async create(paqueteData: Partial<Paquete>): Promise<Paquete> {
        const paquete = this.repository.create(paqueteData);
        return await this.repository.save(paquete);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}

export const paqueteRepository = new PaqueteRepository();