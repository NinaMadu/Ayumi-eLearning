import express from "express";
import { signup, signin, signOut, adminSignup, forgetPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signOut);
router.post("/adminSignup", adminSignup);
router.post("/forget-password",forgetPassword);
router.post("/reset-password/:token",resetPassword);

export default router;