import { Context, Status } from "../dependences.ts";


const NotFound = async (ctx: Context) => {
  ctx.response.status = Status.NotFound;
  ctx.response.body = { message: "Not Found !!" };
};

export default NotFound;
