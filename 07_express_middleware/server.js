import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { logEvents } from './middleware/logEvents.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



// there are three types of middleware:
// 1. built in middleware
// 2. custom middleware
// 3. third party middleware


// this is built in middleware
// this is used to parse the url encoded data
app.use(express.urlencoded({ extended: false }))

// this is built in middleware to parse the json data
app.use(express.json())

// this is built in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))

// it is used to load the environment variables from the .env file
// this is external library


//custom middleware to log the events
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
});

// custom middleware to handle errors
const whitelist = ['https://www.google.com', 'http://localhost:3500','http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

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

app.use(errorHandler);

// 404 page not working 
// this is built in middleware
app.use((req, res) => {
    if( req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    } else if( req.accepts('json')){
        res.status(404).json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.listen(PORT, (req, res) => {
    console.log('Server is running on PORT ' + PORT);
})

