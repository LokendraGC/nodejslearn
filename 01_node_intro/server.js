/*
Nodejs vs Normal js in console

1.  Nodejs is a runtime environment that allows you to run JavaScript code outside of a web browser,
    while normal JavaScript (often referred to as "client-side JavaScript") is
    executed within a web browser.
2.  the console is the terminal window where you can run Node.js commands 
3. global objects instead of window objects
4. It has comon modules like fs, http, path, etc. that are not available in normal JavaScript
5. common js moduls instead of es6 modules
6. nodejs is not library, it is runtime environment but express is a 
framework built on top of nodejs to make it easier to build web applications and APIs
7. nodejs is used for server side programming while normal js is used for client side programming
8. nodejs is used for building server side applications, command line tools, and scripts, 
while normal js is used for building interactive web pages and client side applications


9. common js module vs es6 module
- common js module uses require() to import modules and module.exports to export modules, 
while es6 module uses import and export keywords
- common js module is synchronous, while es6 module is asynchronous
*/
// eg: common js module

const os = require('os');
const path = require('path');
const { add, sub } = require('./math');

console.log(add(5, 3));
console.log(sub(10, 3));

console.log(os.platform());
console.log(os.type);

console.log(__dirname);

console.log(path.parse(__filename));