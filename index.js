import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import Routes from './routes/routes.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;
// const URL = process.env.URL || 'mongodb://localhost:27017';
const URL = 'mongodb://localhost:27017';
// const URL = process.env.URL

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes);
app.use('/static', express.static(__dirname + '/views'));
app.all('*', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.readFile('./views/notFound.html', null, function (err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
});

mongoose.connect(URL).then(() => {
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));

}).catch((err) => {
    console.log('Error:', err.message);
});