import { DataTypes, Database, Model, 
    } 
    from "../dependences.ts";

import { connectorMongoDB } 
    from "../config/connectors.ts";    
    
const mongoDB =  new Database(connectorMongoDB);  

class QuoteModel extends Model { 
    static table = "quote"; 
    static fields = { 
        _id: {
            primaryKey: true,
          },

        id: { 
            type: DataTypes.INTEGER, 
            unique: true,
        }, 

        quote: { 
            type: DataTypes.STRING,
            length: 200,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            length: 100,
            allowNull: false,
        }
    };
    //--- ! indica no-null 
    _id!: string;
    id!: number; 
    quote!: string; 
    author!: string; 

}

mongoDB.link([QuoteModel]); 
mongoDB.sync();

export { QuoteModel }; 

