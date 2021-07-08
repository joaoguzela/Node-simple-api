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

export default {

    inserirCliente   
}
