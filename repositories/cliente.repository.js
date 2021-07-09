import {connect} from "./db.js"

const inserirCliente = async(cliente) => {
    const conn = await connect();
    try {
     const sql = "INSERT INTO clientes (nome, cpf, dataNasc, idade) VALUES ($1,$2,$3,$4) RETURNING *"
     const values = [cliente.nome,cliente.cpf,cliente.dataNasc,cliente.idade];
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
            "   SET nome = $1, cpf = $2, dataNasc = $3, idade = $4" +
            " WHERE cliente_id = $5 RETURNING *";
        const values = [cliente.nome, cliente.cpf, cliente.dataNasc, cliente.idade, cliente.cliente_id];
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
