import { AppDataSource } from "../config/data-source.js";
import { AuditoriaEnvio } from "../entity/AuditoriaEnvio.js";

export class AuditoriaEnvioRepository {
    private get repository() {
        return AppDataSource.getRepository(AuditoriaEnvio);
    }

    async findByEnvioId(envioId: number): Promise<AuditoriaEnvio[]> {
        return await this.repository.find({
            where: { envio_id: envioId },
            order: { fecha_modificacion: "DESC" }
        });
    }
}

export const auditoriaEnvioRepository = new AuditoriaEnvioRepository();
