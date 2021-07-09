import {connect} from "./db.js"
const novaLocacao = async(locacao) => {
    const conn = await connect();
    try {
        const sql = "INSERT INTO locacao (data_loc, data_dev, his, renovacoes, cliente_id, filme_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
        const values = [locacao.data_loc, locacao.data_dev, locacao.his, locacao.renovacoes, locacao.cliente_id, locacao.filme_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const renovaLocacao = async(locacao) => {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE locacao " +
            "    SET data_loc = $2, data_dev = $3, his = $4, renovacoes = $5, cliente_id= $6, filme_id = $7 " +
            " WHERE locacao_id = $1 RETURNING *";
        const values = [locacao.locacao_id, locacao.data_loc, locacao.data_dev, locacao.his, locacao.renovacoes, locacao.cliente_id, locacao.filme_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const buscarLocacaoPorId = async(id) => {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM locacao WHERE locacao_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const deleteLocacaoPorId = async(id) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM locacao WHERE locacao_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}
export default {
    novaLocacao,
    renovaLocacao,
    buscarLocacaoPorId,
    deleteLocacaoPorId
}