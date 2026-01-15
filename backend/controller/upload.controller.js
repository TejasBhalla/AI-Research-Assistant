import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { chunkText } from '../utils/chunking.js';
import { extractText } from '../utils/extracttext.js';
import { sendChunkToApi } from '../utils/sendchunktoapi.js';

export const extractChunks= async (req, res) => {
    try {
        const files = req.files
        const allChunks = []
        if (!files) return res.status(400).json({ message: 'No file uploaded' });
        for (const file of files) {
            const text = await extractText(file)
            const chunks = chunkText(text)
            const taggedChunks = chunks.map(chunk => ({
                chunk,
                docId: file.originalname,
            }));
            allChunks.push(...taggedChunks)
        }
        const result = await sendChunkToApi(allChunks)
        return res.status(200).json({ result });

    } catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}


export const clearChunks = async () =>{
    try{
    await axios.post('http://localhost:8000/reset')
    return res.status(202).json({message:'successfully deleted'})
    } catch(error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }

}