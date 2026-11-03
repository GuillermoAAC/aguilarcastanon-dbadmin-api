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
router.get("/producto/:id", getProducto);
router.post("/producto", createProducto);
router.put("/producto/:id", updateProducto);
router.delete("/producto/:id", deleteProducto);

export default router;
