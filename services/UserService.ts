import { User } from "../interfaces/User.ts";
import { default as UserRepository } 
    from "../repositories/UserRepository.ts";

import { shaEncrypt } from "../utils/encodehelper.ts";


class UserService {
    users = UserRepository;
   
    isLoginUser = async (account: string, password: string)=>{
        password = shaEncrypt(password);    
        return this.users.isLogin(account, password);
    }
    
    fetchUsers = () => {
        return this.users;
    };

      
    fetchUser = (id: number) =>
        this.users.getUser(id);
    
    
    createUser = (user: User) => {
        this.users.addUser(user)
            
    };

    updateUser = (user: User, id: number) => {
            const updatedUser: {
            id: string;
            account: string;
            password: string;
        } = user;
        
        return this.users.updateUser(id,user);
    };

    deleteUser = (id: number) => {
        return this.users.deleteUser(id);
      };
}

export default new UserService();