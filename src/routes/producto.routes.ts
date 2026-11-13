import { Router } from "express";
import {
    getProducts,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
} from "../controllers/producto.controller.js";

const router = Router();

router.get("/productos", getProducts);
router.get("/producto", getProducts);
router.get("/producto/:id", getProducto);
router.get("/productos/:id", getProducto);
router.post("/producto", createProducto);
router.post("/productos", createProducto);
router.put("/producto/:id", updateProducto);
router.put("/productos/:id", updateProducto);
router.delete("/producto/:id", deleteProducto);
router.delete("/productos/:id", deleteProducto);

export default router;
