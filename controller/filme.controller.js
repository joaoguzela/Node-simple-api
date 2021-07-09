import FilmeService from "../service/filme.service.js"
const criarFilme = async(req, res, next)=>{
try {

    let filme = req.body; 
    if(!filme.nome || !filme.genero || !filme.diretor || !filme.quantidade){
        throw new Error("Nome, gênero, diretor, quantidade são obrigatorios");
    }
    filme = await FilmeService.criarFilme(filme);
    res.send(filme);

} catch (err){
    
    next(err);
}
}

const buscarFilmes = async(req, res, next) => {
    try {        
        res.send(await FilmeService.buscarFilme());
        console.log("Filmes encontrados")
    } catch (err) {
        next(err);
    }
}

const buscarFilmePorId = async(req, res, next) => {
    try {
        let id = req.params.id;
        res.send(await FilmeService.buscarFilmePorId(id));
        console.log(`Filme do id: ${id} encontrado`);
    } catch (err) {
        next(err);
    }
}

const deleteFilmePorId = async(req, res, next) => {
    try {
        let id = req.params.id;
        await FilmeService.deleteFilmePorId(id);
        res.end();
        console.log(`Filme do id: ${id} deletado`);
    } catch (err) {
        next(err);
    }
}

const atualizarFilme = async(req, res, next) => {
    try {
        let filme = req.body; 
        if(!filme.nome || !filme.genero || !filme.diretor || !filme.quantidade){
            throw new Error("Nome, gênero, diretor, quantidade são obrigatorios");
        }
        filme = await FilmeService.atualizarFilme(filme);
        res.send(filme);
        console.log(`Dados do filme ${filme.nome} atualizados`);
    } catch (err) {
        next(err);
    }
}

export default{
    criarFilme,
    buscarFilmes,
    buscarFilmePorId,
    deleteFilmePorId,
    atualizarFilme
}