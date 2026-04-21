// This code demonstrates how to use the 'date-fns' npm module to format the current date and time.
import {format} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// Generate a unique identifier using the uuid module
console.log(uuidv4());

const now = new Date();

const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss');

console.log(`Current date and time: ${formattedDate}`);

// ES Module - to do this add type: module in package.json
// import {format} from 'date-fns';

// CommonJS Module
// const {format} = require('date-fns');

// 3.1.14
// MAJOR.MINOR.PATCH

// MAJOR version: Big breaking changes, Old code may stop working
// MINOR version: New features added (safe),
// PATCH version: Bug fixes only.

// "nodemon": "^3.1.14" (caret) - 3.2.15
// Allow updates that do NOT change MAJOR version

// "nodemon": "~3.1.14" (tilde) - 3.1.15
// Allow only patch updates
// Allow updates that do NOT change MAJOR and MINOR version 

// to install specific version - npm install nodemon@3.1.14


// to install all dependencies in package.json - npm install

// to uninstall a package - npm uninstall nodemon or npm rm nodemon

// after add "dev": "nodemon index" in package.json, we can run npm run dev to start the server with nodemon, which will automatically restart the server when we make changes to the code.