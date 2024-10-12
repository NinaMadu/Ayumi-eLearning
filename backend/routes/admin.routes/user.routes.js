import express from "express";
import { deleteUser,  getAllUsers, getUserById, totalUsers} from "../../controllers/user.controller.js";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get("/", getAllUsers);
router.get('/count',totalUsers);
router.get('/:id', getUserById);



export default router;