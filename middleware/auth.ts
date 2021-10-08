import { Context, jwtVerify, Status } from "../dependences.ts";

import { key } from "./jwt/jwt.ts";

const authMiddleware = async (ctx: Context, next: any) => {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");
    if (!authorization) {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { message: "Header Authorization not present" };
    return;
    }
    const jwt = authorization.split(" ")[1];
    if (!jwt) {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { message: "JWT is necessary" };
    return;
    }
    if (await jwtVerify(jwt, key)) {
    await next();
    return;
    }

    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { message: "Invalid jwt token" };
};

export { authMiddleware };
