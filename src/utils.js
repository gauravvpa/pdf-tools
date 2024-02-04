import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export const writeFile = (file) => {
    return new Promise((res, rej) => {
        // in ecamscript modules __dirname is not directly available
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.join(__dirname, file.name);
        fs.writeFile(filePath, file.data, (err) => {
            if (err) {
                rej(err)
            } else {
                res({ message: "File Written Successfully", directory: __dirname });
            }
        });
    })
}

export const readFile = (filePath) => {
    return new Promise((res, rej) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data);
            }
        })
    })
}