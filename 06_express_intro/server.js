import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// it is used to load the environment variables from the .env file
// this is external library
dotenv.config();

const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    // res.send('hello there');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));  
})

app.get('/hello', (req, res) => {
    // res.send('hello there');
    res.sendFile(path.join(__dirname, 'views', 'hello.html'));  
})

app.get('/new-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

// refirect old to new page
app.get('/old-page', (req, res) => {
    res.redirect(301, '/new-page');
})

// 404 page not working 
// this is built in middleware
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, (req, res) => {
    console.log('Server is running on PORT ' + PORT);
})

