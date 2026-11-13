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
router.get("/venta", getVentas);
router.get("/venta/:id", getVenta);
router.get("/ventas/:id", getVenta);
router.post("/venta", createVenta);
router.post("/ventas", createVenta);
router.put("/venta/:id", updateVenta);
router.put("/ventas/:id", updateVenta);
router.delete("/venta/:id", deleteVenta);
router.delete("/ventas/:id", deleteVenta);

export default router;
