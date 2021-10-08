import { DataTypes, Database, Model } 
    from "../dependences.ts";

import { connector } 
    from "../config/configdb.ts";    


      
const db = new Database(connector);  

class UserModel extends Model { 
    static table = "user"; 
    static fields = { 
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, autoIncrement: true, 
        }, 
        account: { 
            type: DataTypes.STRING,
            length: 20,
            unique:true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            length: 128,
            allowNull: false,
        }
    };
    //--- ! indica no-null 
    id!: number; 
    account!: string; 
    password!: string; 

};

db.link([UserModel]); 



export { UserModel }; 

