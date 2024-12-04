import { Router } from "express";
import { getUser, login, signUp } from "../controllers/user";
import auth from "../middleware/auth";

const router = Router()

router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/").get(auth, getUser)

export default router