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


// @desc    Add  quote
// @route   POST /api/v1/users/login
export const loginUser = async (
    {request, response}: { request: any; response: any },
) => {
    if (!request.body()) {
        response.status = Status.BadRequest;
        response.body = {
            success: false,
            message: "The request must have a body",
        };
        return;
    }


    const data = await request.body().value;
    
    const isLoginUser = await userService.isLoginUser(
        data.account, data.password);
    
    if (isLoginUser){
        response.status = Status.OK;
        const jwt = await jwtCreate(header, payload(data.account), key);


        response.body = {
            success: true,
            data: jwt,
        }
    } else {
        response.status = Status.UnprocessableEntity;
        response.body = {
            success: false,
            message:"Invalid username or password'",
            data: data
        };
    }
};
