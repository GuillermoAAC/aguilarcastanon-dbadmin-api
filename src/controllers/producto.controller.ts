import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository.js";

// Obtener todos los productos (GetAll)
export const getProducts = async (req: Request, resp: Response) => {
    const productos = await productoRepository.findAll();
    return resp.json({
        message: "Productos encontrados",
        status: 200,
        data: productos
    });
};

// Obtener un producto por ID (GetById)
export const getProducto = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    const producto = await productoRepository.findById(id);
    return resp.json({
        message: "Producto encontrado",
        status: 200,
        data: producto
    });
};

// Crear un producto (Post)
export const createProducto = async (req: Request, resp: Response) => {
    const producto = await productoRepository.create(req.body);
    return resp.status(201).json({
        message: "Producto creado",
        status: 201,
        data: producto
    });
};

// Actualizar un producto (Put)
export const updateProducto = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    const producto = await productoRepository.update(id, req.body);
    return resp.json({
        message: "Producto actualizado",
        status: 200,
        data: producto
    });
};

// Eliminar un producto (Delete)
export const deleteProducto = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    await productoRepository.delete(id);
    return resp.json({
        message: "Producto eliminado",
        status: 200
    });
};
