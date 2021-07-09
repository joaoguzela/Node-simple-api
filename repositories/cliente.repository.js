import {connect} from "./db.js"

const inserirCliente = async(cliente) => {
    const conn = await connect();
    try {
     const sql = "INSERT INTO clientes (nome, cpf, datanasc, idade, quantidadeloc) VALUES ($1,$2,$3,$4,$5) RETURNING *"
     const values = [cliente.nome,cliente.cpf,cliente.datanasc,cliente.idade, cliente.quantidadeloc];
     const res = await conn.query(sql, values);
     return res.rows[0];
    } catch (err) {
        
        throw err
    
    }finally{
        
        conn.release();
    }
}

const buscarCliente = async() => {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clientes");
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const buscarClientePorId = async(id) => {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clientes WHERE cliente_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const deleteClientePorId = async(id) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM clientes WHERE cliente_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

const atualizarCliente = async(cliente) => {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE clientes " +
            "   SET nome = $1, cpf = $2, datanasc = $3, idade = $4, quantidadeloc = $5" +
            " WHERE cliente_id = $6 RETURNING *";
        const values = [cliente.nome, cliente.cpf, cliente.datanasc, cliente.idade, cliente.quantidadeloc, cliente.cliente_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {

    inserirCliente,
    buscarCliente,
    buscarClientePorId,
    deleteClientePorId,
    atualizarCliente   
}
