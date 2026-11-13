import { Router } from "express";
import {
    registrarEnvio,
    actualizarCostoEnvio,
    asignarPaqueteAlmacen,
    registrarRastreoEnvio,
    listarEnviosActivos,
    listarEnviosPorCliente,
    obtenerEnvioPorId
} from "../controllers/envio.controller.js";

const router = Router();

router.post("/envios", registrarEnvio);
router.post("/envio", registrarEnvio);

router.put("/envios/:id/costo", actualizarCostoEnvio);
router.put("/envio/:id/costo", actualizarCostoEnvio);

router.post("/almacenes/:id/paquetes", asignarPaqueteAlmacen);
router.post("/almacen/:id/paquetes", asignarPaqueteAlmacen);

router.post("/envios/:id/rastreo", registrarRastreoEnvio);
router.post("/envio/:id/rastreo", registrarRastreoEnvio);

router.get("/envios", listarEnviosActivos);
router.get("/envio", listarEnviosActivos);

router.get("/envios/:id", obtenerEnvioPorId);
router.get("/envio/:id", obtenerEnvioPorId);

router.get("/clientes/:id/envios", listarEnviosPorCliente);
router.get("/cliente/:id/envios", listarEnviosPorCliente);

export default router;