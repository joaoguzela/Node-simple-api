import express from "express";
import ClienteController from "../controller/cliente.controller.js";

const router = express.Router();

router.post("/cadastrar", ClienteController.criarCliente);
router.get("/listar", ClienteController.buscarClientes);
router.get("/listar/:id", ClienteController.buscarClientePorId);
router.delete("/deletar/:id", ClienteController.deleteClientePorId);
router.put("/atualizar", ClienteController.atualizarCliente);


export default router;