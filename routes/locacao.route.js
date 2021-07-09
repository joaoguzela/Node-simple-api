import express from "express";
import LocacaoController from "../controller/locacao.controller.js";

const router = express.Router();

router.post("/cadastrar", LocacaoController.novaLocacao);
router.put("/atualizar", LocacaoController.renovaLocacao);
router.delete("/deletar/:id",LocacaoController.deleteLocacaoPorId)
export default router;