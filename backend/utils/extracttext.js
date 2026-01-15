import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const extractText = async (file) => {
    if (!file) throw new Error('invalid file')
    if (file.mimetype == 'application/pdf') {
        const dataBuffer = fs.readFileSync(file.path)
        const data = await pdfParse(dataBuffer)
        return data.text
    } else if (file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const data = await mammoth.extractRawText({ path: file.path })
        return data.value
    } else if (file.mimetype === 'text/plain') {
        return fs.readFileSync(file.path, 'utf8');
    } else {
        throw new Error('Unsupported file type');
    }
}