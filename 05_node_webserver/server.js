// custom module
import logEvent from './logEvents.js';

// built-in modules
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// console.log(import.meta.url); - gives the URL of the current module
//  like file:///d:/nodejs/Dave_Gray/05_webserver/server.js

// console.log(fileURLToPath(import.meta.url)); - gives the file path of the current module
//  like D:\nodejs\Dave_Gray\05_webserver\server.js

// console.log(dirname(fileURLToPath(import.meta.url))); - gives the directory name of the current module
//  like D:\nodejs\Dave_Gray\05_webserver

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3500;

// CREATE SERVER
const server = http.createServer((req, res) => {

    console.log('\n===== NEW REQUEST =====');
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    // log event
    logEvent(`${req.method}\t${req.url}`);

    // 1. Get extension from request
    const extension = path.extname(req.url);
    console.log('Extension:', extension);

    // 2. Set content type
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        default:
            contentType = 'text/html';
    }

    console.log('Content-Type:', contentType);

    // 3. Build file path
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // If no extension, add .html
    if (!extension && req.url.slice(-1) !== '/') {
        filePath += '.html';
    }

    console.log('Final File Path:', filePath);

    // 4. Check file exists
    fs.exists(filePath, (exists) => {

        if (exists) {
            console.log('File exists, serving file...');

            // 5. Read file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log('Error reading file:', err);
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });

        } else {
            console.log('File NOT found');

            // 6. Handle 404
            res.writeHead(404, { 'Content-Type': 'text/html' });

            fs.readFile(path.join(__dirname, 'views', '404.html'), (err, data) => {
                if (err) {
                    res.end('404 Not Found');
                } else {
                    res.end(data);
                }
            });
        }

    });
});

// START SERVER
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});