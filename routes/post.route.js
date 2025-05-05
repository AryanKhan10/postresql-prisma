import { Router } from "express";
import { createPost, updatePost, deletePost, getAllPost } from "../controller/post.js";
const router= Router()

router.post("/create",createPost)
router.put("/update/:id",updatePost)
router.delete("/delete/:id",deletePost)
router.get("/getAllPosts",getAllPost)
export default router