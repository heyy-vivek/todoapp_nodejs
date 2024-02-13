import express from "express";
import { getMyProfile, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me",isAuthenticated,getMyProfile);
router.post("/new",register);
router.post("/login",login );
router.get("/logout",logout );

export default router;




// router.get("/userid/:id",getUserById);
// router.put("/userid/:id",updateUserById);
// router.delete("/userid/:id",deleteUserById)


//"/userid" is a static url and "userid/:id" this is a dynamic url where anything after userid/ will be considered as id .

//if you want to send any information through while working in get api, send it via params and not in body #goodpractice

