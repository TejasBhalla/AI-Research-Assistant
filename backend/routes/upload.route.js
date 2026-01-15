import express from "express"; 
import multer from 'multer';
import { clearChunks, extractChunks } from "../controller/upload.controller.js";

const router= express.Router()
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post('/',upload.array('files',10),extractChunks)

router.delete('/clear',clearChunks)
export default router
