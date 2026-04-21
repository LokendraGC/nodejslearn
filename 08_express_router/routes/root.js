import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'


const router = express.Router()

//  outpur: subdir.js
const __filename = fileURLToPath(import.meta.url)

// output: routes
const __dirname = path.dirname(__filename)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

// 302 for redirect page
router.get('/old-page', (req, res) => {
    res.redirect('/new-page')
})

router.get('/hello', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'hello.html'))
    next();
}, (req, res) => {
    console.log('Finished sending hello.html');
});

// app.get('*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
// })


export default router;