import express from "express";
import { 
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost, 
} from "../controller/PostController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPostByID);
router.post("/posts", verifyToken, createPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
