import ClienteRepository from "../repositories/cliente.repository.js"

const criarCliente = async (cliente)=>{
    
    return await ClienteRepository.inserirCliente(cliente);
}

export default {
    criarCliente
}