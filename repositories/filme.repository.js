import {connect} from "./db.js"

const inserirFilme = async(filme) => {
    const conn = await connect();
    try {
     const sql = "INSERT INTO filmes (nome, genero, diretor, quantidade) VALUES ($1,$2,$3,$4) RETURNING *"
     const values = [filme.nome, filme.genero, filme.diretor, filme.quantidade];
     const res = await conn.query(sql, values);
     return res.rows[0];
    } catch (err) {
        
        throw err
    
    }finally{
        
        conn.release();
    }
}

const buscarFilmes = async() => {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM filmes");
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const buscarFilmePorId = async(id) => {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM filmes WHERE filme_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const deleteFilmePorId = async(id) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM filmes WHERE filme_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const atualizarFilme = async(filme) => {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE filmes " +
            "   SET nome = $1, genero = $2, diretor = $3, quantidade = $4" +
            " WHERE filme_id = $5 RETURNING *";
        const values = [filme.nome, filme.genero, filme.diretor, filme.quantidade];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {

    inserirFilme,
    buscarFilmes,
    buscarFilmePorId,
    deleteFilmePorId,
    atualizarFilme   
}
