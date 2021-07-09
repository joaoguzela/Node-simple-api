import FilmeService from "../service/filme.service.js"
const novaLocacao = async(req, res, next)=>{
try {

    let filme = req.body; 
    if(!filme.nome || !filme.genero || !filme.diretor || !filme.quantidade){
        throw new Error("Nome, gênero, diretor, quantidade são obrigatorios");
    }
    filme = await FilmeService.criarFilme(filme);
    res.send(filme);

    }catch (err){
    
    next(err);
    }
}
const renovarLocacao = async(req, res, next) => {
    try {
        let cliente = req.body; 
        if(!cliente.cliente_id||!cliente.nome || !cliente.cpf || !cliente.dataNasc || !cliente.idade){
            throw new Error("Id, Nome, CPF, data de nascimento e idade são obrigatorios");
        }
        if(cliente.idade < 18){
            throw new Error("Cliente não pode ser menor de 18 anos");   
        }
        if(!await validaCpf(cliente.cpf)){
            throw new Error("CPF iNVALIDO");
        }
        if(!await validaData(cliente.dataNasc)){
            throw new Error("Data de nascimento esta no formato errado, o formato correto é dd/mm/aaaa");
        }          
        cliente = await ClienteService.atualizarCliente(cliente);
        res.send(cliente);
        console.log(`Dados do cliente ${cliente.nome} atualizados`);
    } catch (err) {
        next(err);
    }
}
const buscarLocacoes = async(req, res, next) => {
    try {
        let id = req.params.id;
        res.send(await ClienteService.buscarClientePorId(id));
        console.log(`Cliente do id: ${id} encontrado`);
    } catch (err) {
        next(err);
    }
}
