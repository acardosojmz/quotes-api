import { User } from "../interfaces/User.ts";
import { UserModel } from "../models/UserModel.ts";

class UserRepository { 

    async getUsers() { 
        return await UserModel.select("id","account").all();
    }
    
    async getUser(id:number) { 
        return await UserModel.find(id); 
    } 

    async isLogin(account:string, password:string) { 
        const users =  await UserModel.where("account",account).select().all();
        let isAuthenticate=false;

        users.forEach((user: any) => {
            if (user.password === password){
                isAuthenticate= true;
            }
        });
        return  (isAuthenticate);
    } 

    async searchUserOneCol(field: string, value: string) {
        return await UserModel.where(field, value).get(); 
    }

    async searchUserManyCols(fields: any) {
        return await UserModel.where(fields).get()
    }

    async getUserSort(fields: any) { 
        return await UserModel.orderBy(fields).all(); 
    }

    async addUser(user: User) { 
        const newUser = new UserModel(); 
        newUser.account= user.account; 
        newUser.password = user.password; 

        return await newUser.save();
    }

    

    async updateUser(id: number, user: User) { 

        let findUser = await this.getUser(id); 
        findUser.account = user.account;
        findUser.password = user.password;

        await findUser.update();

        return await this.getUser(id); 
    }

    async deleteUser(id: number) {
        let findUser = await this.getUser(id); 
        await findUser.delete(); 

    }

} 

export default new UserRepository();
