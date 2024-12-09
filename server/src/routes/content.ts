import { Router } from "express";
import auth from "../middleware/auth";
import { addContent, deleteContent,  getAllContent,  updateContent } from "../controllers/content";

const router = Router()

router.route("/").post(auth,addContent)
router.route("/").get(auth, getAllContent)
router.route("/:contentId").put(auth, updateContent)
router.route("/:contentId").delete(auth, deleteContent)


export default router