import { Router } from "express";
import {
    getVentas,
    getVenta,
    createVenta,
    updateVenta,
    deleteVenta
} from "../controllers/venta.controller.js";

const router = Router();

router.get("/ventas", getVentas);
router.get("/venta/:id", getVenta);
router.post("/venta", createVenta);
router.put("/venta/:id", updateVenta);
router.delete("/venta/:id", deleteVenta);

export default router;
