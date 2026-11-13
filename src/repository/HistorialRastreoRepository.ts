import { AppDataSource } from "../config/data-source.js";
import { HistorialRastreo } from "../entity/HistorialRastreo.js";

export class HistorialRastreoRepository {
    private get repository() {
        return AppDataSource.getRepository(HistorialRastreo);
    }

    async findByEnvioId(envioId: number): Promise<HistorialRastreo[]> {
        return await this.repository.find({
            where: { envio_id: envioId },
            order: { fecha: "ASC" }
        });
    }

    async create(rastreoData: Partial<HistorialRastreo>): Promise<HistorialRastreo> {
        const data = {
            ...rastreoData,
            fecha: rastreoData.fecha || new Date()
        };
        const rastreo = this.repository.create(data);
        return await this.repository.save(rastreo);
    }
}

export const historialRastreoRepository = new HistorialRastreoRepository();