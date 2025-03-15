import express from "express"
import { signUp,login,logout, updateProfile, getProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router=express.Router();

router.post("/signup",signUp);
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,getProfile)

export default router