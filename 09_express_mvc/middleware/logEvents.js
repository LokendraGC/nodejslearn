import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';


import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename); D:\nodejs\Dave_Gray\07_express_middleware\middleware\logEvents.js
// console.log(__dirname); D:\nodejs\Dave_Gray\07_express_middleware\middleware

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logsDir = path.join(__dirname, '..', 'logs');

        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir, { recursive: true });
        }

        await fsPromises.appendFile(
            path.join(logsDir, logName),
            logItem
        );

    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
}

export {logEvents, logger};