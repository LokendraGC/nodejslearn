// This code demonstrates how to use the 'date-fns' npm module to format the current date and time.
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logEvent = async (message) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {

        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'logEvents.txt'), logItem);

        console.log(logItem);

    } catch (err) {
        console.log(err);
    }
}

export default logEvent;