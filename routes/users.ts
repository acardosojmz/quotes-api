import { Router } from "../dependences.ts";
import {
  loginUser,
  getUsers, 
} from "../controllers/UserController.ts";

const router = new Router();

router.get("/api/v1/users", getUsers); 
router.post("/api/v1/users/login", loginUser); 


export default router;

