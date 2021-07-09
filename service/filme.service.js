import FilmeRepository from "../repositories/filme.repository.js"

const criarFilme = async(filme)=>{
    
    return await FilmeRepository.criarFilme(filme);
}
const buscarFilmes = async() => {
    return await FilmeRepository.buscarFilmes();
}

const buscarFilmePorId= async(id) => {
    return await FilmeRepository.buscarFilmePorId(id);
}

const deleteFilmePorId = async(id) => {
    await FilmeRepository.deleteFilmePorId(id);
}

const atualizarFilme = async(filme) => {
    return await FilmeRepository.atualizarFilme(filme);
}

export default {
    criarFilme,
    buscarFilmes,
    buscarFilmePorId,
    deleteFilmePorId,
    atualizarFilme
}