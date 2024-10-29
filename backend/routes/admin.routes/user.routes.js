import express from "express";
import { deactivateUser, deleteUser,  getAllUsers, getUserById, totalUsers, activateUser, getOnlineUsers} from "../../controllers/user.controller.js";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get('/online', getOnlineUsers);
router.get("/", getAllUsers);
router.get('/count',totalUsers);
router.get('/:id', getUserById);
router.put('/deactivate/:id',deactivateUser);
router.put('/activate/:id',activateUser);




export default router;