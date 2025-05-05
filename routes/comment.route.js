import { Router } from "express";
import {createComment, updateComment, deleteComment, getAllComments} from "../controller/comment.js";
const router= Router()

router.post("/create",createComment)
router.put("/update/:id",updateComment)
router.delete("/delete/:id",deleteComment)
router.get("/getAllComments",getAllComments)
export default router