import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/UserController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;