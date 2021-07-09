import express from "express";
import FilmeController from "../controller/filme.controller.js";

const router = express.Router();

router.post("/cadastrar", FilmeController.criarFilme);
router.get("/listar", FilmeController.buscarFilmes);
router.get("/listar/:id", FilmeController.buscarFilmePorId);
router.delete("/deletar/:id", FilmeController.deleteFilmePorId);
router.put("/atualizar", FilmeController.atualizarFilme);


export default router;