import LocacaoService from "../service/locacao.service.js";
const novaLocacao = async(req, res, next) => {
    try {
        let locacao = req.body;
        if (!locacao.data_loc || !locacao.data_dev ||!locacao.cliente_id || !locacao.filme_id) {
            throw new Error("Datas, cliente e filme são obrigatorios");
        }                
        locacao = await LocacaoService.novaLocacao(locacao);
        res.send(locacao);
        console.log(`${locacao.his}.`);
    } catch (err) {
        next(err);
    }
}
const renovaLocacao = async(req, res, next) => {
    try {
        let locacao = req.body;
        if (!locacao.data_loc || !locacao.data_dev ||!locacao.cliente_id || !locacao.filme_id) {
            throw new Error("Datas, cliente e filme são obrigatorios");
        }
        
        locacao = await LocacaoService.renovaLocacao(locacao);
        res.send(locacao);
        console.log(`${locacao.his}.`);
    } catch (err) {
        next(err);
    }
}

const deleteLocacaoPorId = async(req, res, next) => {
    try {
        await LocacaoService.deleteLocacaoPorId(req.params.id)
        res.end();
        console.log("Item deletado com sucesso")
    } catch (err) {
        next(err);
    }
}

export default {
novaLocacao,
renovaLocacao,
deleteLocacaoPorId
}