import express from "express";
import ClienteController from "../controller/cliente.controller.js";

const router = express.Router();

router.post("/cadastrar", ClienteController.criarCliente);

export default router;