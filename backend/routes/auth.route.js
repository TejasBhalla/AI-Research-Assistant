import express from "express";
import dotenv from 'dotenv'
import passport from "passport";
import { logout } from "../controller/auth.controller.js";
dotenv.config();

const router= express.Router()

// Kick off Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/"); 
  }
);

// Logout
router.get("/logout", logout);

export default router