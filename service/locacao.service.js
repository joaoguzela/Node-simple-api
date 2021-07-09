import LocacaoRepository from "../repositories/locacao.repository.js";
import ClienteRepository from "../repositories/cliente.repository.js";
import FilmeRepository from "../repositories/filme.repository.js";

const novaLocacao = async(locacao)=> {
    let error = "";
    const cliente = await ClienteRepository.buscarClientePorId(locacao.cliente_id);
    if (!cliente) {
        error = "O cliente_id informado não existe.";
    }
    const filme = await FilmeRepository.buscarFilmePorId(locacao.filme_id);
    if (!filme) {
        error += "O filme_id informado não existe.";
    }
    if (error) {
        throw new Error(error);
    }

    if (filme.quantidade > 0 && cliente.quantidadeloc < 5) {
        
        let data = new Date();
        locacao.data_loc = data.toLocaleString();
        data.setDate(data.getDate() + locacao.diasdevolucao); 
        locacao.data_dev = data.toLocaleString();   
            
        locacao.his = (`O filme ${filme.nome} foi alugado por ${cliente.nome} no dia ${locacao.data_loc}.`).toString();
        locacao.renovacoes = 0
        locacao = await LocacaoRepository.novaLocacao(locacao);
        
        cliente.quantidadeloc++;
        await ClienteRepository.atualizarCliente(cliente)
        
        filme.quantidade--;
        await FilmeRepository.atualizarFilme(filme);
        
        return locacao;
    } else {
        throw new Error("O filme informado não possui estoque ou cliente atingiu o maximo de 5 locações");
    }
}
const renovaLocacao = async(locacao)=> {   
    
    if (locacao.renovacoes <= 2) {
        locacao.renovacoes++;
        
        let data = new Date();
        locacao.data_loc = data.toLocaleString();
        data.setDate(data.getDate() + locacao.diasdevolucao); 
        locacao.data_dev = data.toLocaleString();  
        return await LocacaoRepository.renovaLocacao(locacao);
    
    }else{

        throw new Error(`Essa Locação ja possui ${locacao.renovacoes} renovações, não podemos renovar mais uma vez, caso não devolva na data solicitada uma multa será cobrada` );
    }
}

const deleteLocacaoPorId = async(id) => {
    const locacao = await LocacaoRepository.buscarLocacaoPorId(id);
    if (locacao) {
        const filme = await FilmeRepository.buscarFilmePorId(locacao.filme_id);
        filme.quantidade++;
        await FilmeRepository.atualizarFilme(filme);
        
        const cliente = await ClienteRepository.buscarClientePorId(locacao.cliente_id);
        cliente.quantidadeloc++;
        await ClienteRepository.atualizarCliente(cliente)
        
        await LocacaoRepository.deleteLocacaoPorId(id);
        
    } else {
        throw new Error("O id da locação informada não existe.");
    }
}
const LocacaoPorIdFilme = async(filmeId) => {
    if (filmeId) {
        return await LocacaoRepository.LocacaoPorIdFilme(filmeId);
    }
    return await LocacaoRepository.buscarLocacoes();
}
const LocacaoPorIdCliente = async(id) => {
    if (filmeId) {
        return await LocacaoRepository.LocacaoPorIdCliente(id);
    }
    return await LocacaoRepository.buscarLocacoes();
}

const buscarLocacaoPorId = async(id) => {
    return await LocacaoRepository.buscarLocacaoPorId(id);
}


export default {
    novaLocacao,
    renovaLocacao,
    deleteLocacaoPorId,
    LocacaoPorIdFilme,
    LocacaoPorIdCliente,
    buscarLocacaoPorId
}
