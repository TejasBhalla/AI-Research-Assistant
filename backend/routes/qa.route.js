import openai from '../config/openai.js';
import express from "express";
import dotenv from 'dotenv'
import { askQuestion } from '../controller/qa.controller.js';
dotenv.config();

const router= express.Router()
router.post('/ask',askQuestion)

export default router