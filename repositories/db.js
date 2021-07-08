import pg from "pg";

const connect = async () =>{
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString: "postgres://htrdeloj:NUQXOmmJdH334ufgNzQ9rBHoeDBm72hU@batyr.db.elephantsql.com/htrdeloj"
    });
    global.connection = pool;
    
    return pool.connect();
}

export {
    connect
}