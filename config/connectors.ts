import { MySQLConnector, MongoDBConnector } 
    from "../dependences.ts";

export const connectorMariaDB = new MySQLConnector({
    database: 'quotes',
    host: 'localhost',
    username: 'devDeno',
    password: 't0ps3cr3t',
    port: 3307, 
});

export  const connectorMongoDB = new MongoDBConnector({
    uri: 'mongodb://cardoso:t0ps3cr3t@localhost:27017',    
    database: 'quotes',
});

