import ClienteService from "../service/cliente.service.js"
const criarCliente = async(req, res, next)=>{
try {

    let cliente = req.body; 
    if(!cliente.nome || !cliente.cpf || !cliente.dataNasc || !cliente.idade){
        throw new Error("Nome, CPF, data de nascimento e idade são obrigatorios");
    }
    if(cliente.idade < 18){
        throw new Error("Cliente não pode ser menor de 18 anos");

    }
    cliente = await ClienteService.criarCliente(cliente);
    res.send(cliente);

} catch (err){
    
    next(err);
}
}

export default{
    criarCliente
}