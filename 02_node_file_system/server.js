const fsPromises = require('fs').promises;
const path = require('path');


// prevent from the callback hell, and we can also use try catch block to
//  handle errors instead of using error first callback function.
const fileOs = async()=>{
    try{

        // read file
        const data = await fsPromises.readFile(path.join(__dirname,'files','lorem.txt'),'utf8');
        console.log(data);
        // write file
        await fsPromises.writeFile(path.join(__dirname,'files','reply.txt'),'Write Completed');
        console.log('Writing Completed');
        // uppend file
        await fsPromises.appendFile(path.join(__dirname,'files','reply.txt'),'\n\n lets go bro');
        console.log('Update Completed');
        // rename file
        await fsPromises.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','reply2.txt'));
        console.log('rename file');

    }catch(err){
        console.log(err);   
    }
}

fileOs();


// fs.readFile(path.join(__dirname,'files','lorem.txt'),'utf8',(err,data)=>{
//     if( err ) throw err 

//     // if we do not user UTF-8 encoding, we will get a buffer object instead of a string
//     // <Buffer 48 69 20 49 20 61 6d 20 6c 6f 6b 65 6e 64 72 61> like this
//     console.log(data);
// })  


// console.log('processing');

// write file
// fs.writeFile(path.join(__dirname,'files','reply.txt'),'Write Completed',(err)=>{
//     if( err ) throw err 

//     console.log('Writing Completed');
    
//         // uppend file 
//         fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\n lets go bro',(err)=>{
//             if( err ) throw err 
        
//             console.log('Update Completed');
//         })  
//         // rename file
//         fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','reply2.txt'),(err)=>{
//             if( err ) throw err
//             console.log('rename completed');
//         })
// })  



// error handler
process.on('uncaughtException',(err)=>{
    console.log('uncaught exception');
    console.log(err);
    process.exit(1);
})