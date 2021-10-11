import { User } from "../interfaces/User.ts";
import { default as userRepository  } 
    from "../repositories/UserRepository.ts";

import { shaEncrypt } from "../utils/encodehelper.ts";


class UserService {

    isLoginUser = async (account: string, password: string)=>{
        password = shaEncrypt(password);    
        return await userRepository.isLogin(account, password);
        
    }
    
    fetchUsers = async () =>  {
        return  await userRepository.getUsers();
    };

      
    fetchUser = async (id: number) =>{
        return await userRepository.getUser(id);
    }
        
    
    
    createUser = async (user: User) => {
        return await userRepository.addUser(user)  
    };

    updateUser = async (user: User, id: number) => {
            const updatedUser: {
            id: number;
            account: string;
            password: string;
        } = user;
        
        return await userRepository.updateUser(id,user);
    };

    deleteUser = async (id: number) => {
        return  await userRepository.deleteUser(id);
    };
}

export default new UserService();