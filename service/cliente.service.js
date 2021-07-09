import ClienteRepository from "../repositories/cliente.repository.js"

const criarCliente = async(cliente)=>{
    return await ClienteRepository.inserirCliente(cliente);
}
const buscarClientes = async() => {
    return await ClienteRepository.buscarCliente();
}

const buscarClientePorId= async(id) => {
    return await ClienteRepository.buscarClientePorId(id);
}

const deleteClientePorId = async(id) => {
    await ClienteRepository.deleteClientePorId(id);
}

const atualizarCliente = async(cliente) => {
    return await ClienteRepository.atualizarCliente(cliente);
}

export default {
    criarCliente,
    buscarClientes,
    buscarClientePorId,
    deleteClientePorId,
    atualizarCliente
}