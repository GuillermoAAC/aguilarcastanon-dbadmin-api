import { AppDataSource } from "../config/data-source.js";
import { Producto } from "../entity/Producto.js";


export class ProductoRepository {
    private get repository() {
        return AppDataSource.getRepository(Producto);
    }

    async findAll(): Promise<Producto[]> {
        return await this.repository.find({
            relations: ["categoria"]
        });
    }

    async findById(id: number): Promise<Producto | null> {
        return await this.repository.findOne({
            where: { productoId: id },
            relations: ["categoria"]
        });
    }

    async findByCategoria(categoriaId: number): Promise<Producto[]> {
        return await this.repository.find({
            where: { categoriaId },
            relations: ["categoria", "detallesVenta"]
        });
    }

    async save(producto: Producto): Promise<Producto> {
        return await this.repository.save(producto);
    }

    async create(productoData: any): Promise<Producto> {
        const data: Partial<Producto> = {
            ...productoData,
            categoriaId: productoData.categoriaId ?? productoData.categoria_id
        };
        const producto = this.repository.create(data);
        return await this.repository.save(producto);
    }

    async update(id: number, productoData: any): Promise<Producto | null> {
        const data = { ...productoData };
        if (data.categoria_id !== undefined && data.categoriaId === undefined) {
            data.categoriaId = data.categoria_id;
            delete data.categoria_id;
        }
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    async updateStock(id: number, cantidad: number): Promise<Producto | null> {
        const producto = await this.findById(id);
        if (!producto) return null;
        producto.stock += cantidad;
        return await this.repository.save(producto);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}

export const productoRepository = new ProductoRepository();
