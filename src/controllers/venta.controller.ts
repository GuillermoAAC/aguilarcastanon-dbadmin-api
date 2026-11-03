import { Request, Response } from "express";
import { ventaRepository } from "../repository/VentaRepository.js";

// Obtener todas las ventas (GetAll)
export const getVentas = async (req: Request, resp: Response) => {
    const ventas = await ventaRepository.findAll();
    return resp.json({
        message: "Ventas encontradas",
        status: 200,
        data: ventas
    });
};

// Obtener una venta por ID (GetById)
export const getVenta = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    const venta = await ventaRepository.findById(id);
    return resp.json({
        message: "Venta encontrada",
        status: 200,
        data: venta
    });
};

// Crear una venta (Post)
export const createVenta = async (req: Request, resp: Response) => {
    const venta = await ventaRepository.create(req.body);
    return resp.status(201).json({
        message: "Venta creada",
        status: 201,
        data: venta
    });
};

// Actualizar una venta (Put)
export const updateVenta = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    const venta = await ventaRepository.update(id, req.body);
    return resp.json({
        message: "Venta actualizada",
        status: 200,
        data: venta
    });
};

// Eliminar una venta (Delete)
export const deleteVenta = async (req: Request, resp: Response) => {
    const id = Number(req.params.id);
    await ventaRepository.delete(id);
    return resp.json({
        message: "Venta eliminada",
        status: 200
    });
};
