import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository.js";

// Obtener todos los productos (GetAll)
export const getProducts = async (_req: Request, resp: Response) => {
    try {
        const productos = await productoRepository.findAll();
        return resp.json({
            message: "Productos encontrados",
            status: 200,
            data: productos
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID (GetById)
export const getProducto = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const producto = await productoRepository.findById(id);
        if (!producto) {
            return resp.status(404).json({
                message: "Producto no encontrado",
                status: 404
            });
        }
        return resp.json({
            message: "Producto encontrado",
            status: 200,
            data: producto
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Crear un producto (Post)
export const createProducto = async (req: Request, resp: Response) => {
    try {
        const producto = await productoRepository.create(req.body);
        return resp.status(201).json({
            message: "Producto creado",
            status: 201,
            data: producto
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Actualizar un producto (Put)
export const updateProducto = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const producto = await productoRepository.update(id, req.body);
        if (!producto) {
            return resp.status(404).json({
                message: "Producto no encontrado",
                status: 404
            });
        }
        return resp.json({
            message: "Producto actualizado",
            status: 200,
            data: producto
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Eliminar un producto (Delete)
export const deleteProducto = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const eliminado = await productoRepository.delete(id);
        if (!eliminado) {
            return resp.status(404).json({
                message: "Producto no encontrado",
                status: 404
            });
        }
        return resp.json({
            message: "Producto eliminado",
            status: 200
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};
