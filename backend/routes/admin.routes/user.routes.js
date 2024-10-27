import express from "express";
import { deactivateUser, deleteUser,  getAllUsers, getUserById, totalUsers, activateUser} from "../../controllers/user.controller.js";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get("/", getAllUsers);
router.get('/count',totalUsers);
router.get('/:id', getUserById);
router.put('/deactivate/:id',deactivateUser);
router.put('/activate/:id',activateUser);



export default router;