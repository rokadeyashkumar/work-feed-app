import express from "express";
import {
  followUser,
  getCurrentUser,
  getUserProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "User route working" });
});

 // public route
router.get("/profile/:username", getUserProfile);

// protected routes
router.post("/sync", protectRoute, syncUser);
router.post("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, updateProfile);
router.post("/follwe/:targetUserId", protectRoute, followUser);



export default router;