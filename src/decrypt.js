import { decrypt } from "node-qpdf2";
import { readFile, writeFile } from "./utils.js";
import fs from 'fs';

const _validate = (req) => {
    const PDF_MIME_TYPES = ['application/pdf'];
    if (!req.body?.password) {
        return { success: false, message: "Password is required" };
    }
    if (!req.files?.file) {
        return { success: false, message: "File is required." };
    }
    if (Array.isArray(req.files.file)) {
        return { success: false, message: "You can upload 1 file" };
    }
    if (!PDF_MIME_TYPES.includes(req.files.file.mimetype)) {
        return { success: false, message: "Only PDF is supported" };
    }
    return { success: true }
}

export const decryptFile = async (req, res) => {
    try {
        const { success, message } = _validate(req);
        if (!success) {
            return res.send({ success, message });
        }
        const { password } = req.body;
        const { file } = req.files;
        const { directory } = await writeFile(file);
        const decryptedFileName = `DECRYPTED-${file.name}`;
        await decrypt({
            input: `${directory}/${file.name}`,
            output: `${directory}/DECRYPTED-${file.name}`,
            password
        })

        // here i want to return the decrypted file
        const decryptedFile = await readFile(`${directory}/${decryptedFileName}`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(decryptedFile);
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: error.message
        })
    }
}