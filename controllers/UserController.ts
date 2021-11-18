import userService  from "../services/UserService.ts";
     
import { 
    Status, 
    jwtCreate 
} from "../dependences.ts";

import { 
    header, 
    payload,
    key
} from "../middleware/jwt/jwt.ts";


// @desc    Fetch all users
// @route   GET /api/v1/users
export const getUsers = async ({response}: { response: any }) => {
    const users= await userService.fetchUsers();
    response.body =  {
        success: true, 
        message: "list users", 
        data: users,
    };
};


// @desc    Authenticate user
// @route   POST /api/v1/users/login
export const loginUser = async (
    {request, response}: { request: any; response: any },
) => {

    if (request.body()){
        
        const data = await request.body().value;
        
        const isLoginUser = await userService.isLoginUser(
            data.account, data.password);
        
        if (isLoginUser){
            response.status = Status.OK;
            const jwt = await jwtCreate(header, payload(data.account), key);
    
    
            response.body = {
                success: true,
                message: "Authenticate successfull", 
                data: jwt,
            }
            return;
        } 
        response.status = Status.UnprocessableEntity;
        response.body = {
            success: false,
            message:"Invalid username or password!",
            data: "", 
        };
        return;
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have a body",
        data: "", 
    };
};

