import { Context, jwtVerify, Status } from "../dependences.ts";

import { key } from "./jwt/jwt.ts";

const authMiddleware = async (ctx: Context, next: any) => {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");

    if (authorization){
        const jwt = authorization.split(" ")[1];
        if (jwt){
            if (await jwtVerify(jwt, key)) {
                await next();
            } else {
                ctx.response.status = Status.Unauthorized;
                ctx.response.body = { message: "Invalid jwt token" };
            }   
        } else {
            ctx.response.status = Status.Unauthorized;
            ctx.response.body = { message: "JWT is necessary" };
        }      
    } else {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { message: "Header Authorization not present" };
    }    
};

export { authMiddleware };
