import express from "express";
import { deleteUser,  getAllUsers, getUserById , getTotalCountofUsers } from "../../controllers/user.controller.js";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get("/", getAllUsers);
router.get('/:id', getUserById);




export default router;