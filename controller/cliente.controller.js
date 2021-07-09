import ClienteService from "../service/cliente.service.js"
const criarCliente = async(req, res, next)=>{
try {

    let cliente = req.body; 
    if(!cliente.nome || !cliente.cpf || !cliente.datanasc || !cliente.idade){
        throw new Error("Nome, CPF, data de nascimento e idade são obrigatorios");
    }
    if(cliente.idade < 18){
        throw new Error("Cliente não pode ser menor de 18 anos");
    }  
    if(!await validaCpf(cliente.cpf)){
        throw new Error("CPF iNVALIDO");
    }    
    
    cliente = await ClienteService.criarCliente(cliente);
    res.send(cliente);

} catch (err){
    
    next(err);
}
}

const buscarClientes = async(req, res, next) => {
    try {        
        res.send(await ClienteService.buscarClientes());
        console.log("Clientes encontrados")
    } catch (err) {
        next(err);
    }
}

const buscarClientePorId = async(req, res, next) => {
    try {
        let id = req.params.id;
        res.send(await ClienteService.buscarClientePorId(id));
        console.log(`Cliente do id: ${id} encontrado`);
    } catch (err) {
        next(err);
    }
}

const deleteClientePorId = async(req, res, next) => {
    try {
        let id = req.params.id;
        await ClienteService.deleteClientePorId(id);
        res.end();
        console.log(`Cliente do id: ${id} deletado`);
    } catch (err) {
        next(err);
    }
}

const atualizarCliente = async(req, res, next) => {
    try {
        let cliente = req.body; 
        if(!cliente.cliente_id||!cliente.nome || !cliente.cpf || !cliente.datanasc || !cliente.idade){
            throw new Error("Id, Nome, CPF, data de nascimento e idade são obrigatorios");
        }
        if(cliente.idade < 18){
            throw new Error("Cliente não pode ser menor de 18 anos");   
        }
        if(!await validaCpf(cliente.cpf)){
            throw new Error("CPF iNVALIDO");
        }     
        cliente = await ClienteService.atualizarCliente(cliente);
        res.send(cliente);
        console.log(`Dados do cliente ${cliente.nome} atualizados`);
    } catch (err) {
        next(err);
    }
}

const validaCpf = async(cpf) =>{
const reg = 
    new RegExp('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
    return reg.test(cpf)
}
const validaData = async(dataNasc) =>{
    const reg = 
        new RegExp('/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g')
        return reg.test(dataNasc)
    }

export default{
    criarCliente,
    buscarClientes,
    buscarClientePorId,
    deleteClientePorId,
    atualizarCliente
}