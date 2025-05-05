import { Router } from "express";
import { createUser, updateUser, deleteUser, getAllUsers } from "../controller/user.js";
const router= Router()

router.post("/create",createUser)
router.put("/update/:id",updateUser)
router.delete("/delete",deleteUser)
router.get("/getAllUsers",getAllUsers)

export default router