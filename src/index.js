import express from 'express';
import fileUpload from 'express-fileupload';
import { decryptFile } from './decrypt.js';

const app = express();

app.listen(8081, (a, b) => {
    console.log('Server Started');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());


app.post('/decrypt', decryptFile);