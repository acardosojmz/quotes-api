import { MySQLConnector } 
    from "../dependences.ts";

export const connector = new MySQLConnector({
    database: 'quotes',
    host: 'localhost',
    username: 'devDeno',
    password: 't0ps3cr3t',
    port: 3360, 
});

