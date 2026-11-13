import { Request, Response } from "express";
import { ventaRepository } from "../repository/VentaRepository.js";

// Obtener todas las ventas (GetAll)
export const getVentas = async (_req: Request, resp: Response) => {
    try {
        const ventas = await ventaRepository.findAll();
        return resp.json({
            message: "Ventas encontradas",
            status: 200,
            data: ventas
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Obtener una venta por ID (GetById)
export const getVenta = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const venta = await ventaRepository.findById(id);
        if (!venta) {
            return resp.status(404).json({
                message: "Venta no encontrada",
                status: 404
            });
        }
        return resp.json({
            message: "Venta encontrada",
            status: 200,
            data: venta
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Crear una venta (Post)
export const createVenta = async (req: Request, resp: Response) => {
    try {
        const venta = await ventaRepository.create(req.body);
        return resp.status(201).json({
            message: "Venta creada",
            status: 201,
            data: venta
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Actualizar una venta (Put)
export const updateVenta = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const venta = await ventaRepository.update(id, req.body);
        if (!venta) {
            return resp.status(404).json({
                message: "Venta no encontrada",
                status: 404
            });
        }
        return resp.json({
            message: "Venta actualizada",
            status: 200,
            data: venta
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};

// Eliminar una venta (Delete)
export const deleteVenta = async (req: Request, resp: Response) => {
    try {
        const id = Number(req.params.id);
        const eliminado = await ventaRepository.delete(id);
        if (!eliminado) {
            return resp.status(404).json({
                message: "Venta no encontrada",
                status: 404
            });
        }
        return resp.json({
            message: "Venta eliminada",
            status: 200
        });
    } catch (error: any) {
        return resp.status(500).json({ error: error.message });
    }
};
