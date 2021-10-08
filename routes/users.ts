import { Router } from "../dependences.ts";
import {
  loginUser
} from "../controllers/UserController.ts";

const router = new Router();

router.post("/api/v1/users/login", loginUser); 


export default router;
