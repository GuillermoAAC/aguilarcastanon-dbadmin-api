import { Router } from "express";
import { getUser, getUserById } from "../controllers/user.controller.js";

const router = Router();

router.get('/user', getUser);
router.get('/users', getUser);
router.get('/user/:id', getUserById);
router.get('/users/:id', getUserById);

export default router;