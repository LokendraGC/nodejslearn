import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

//  outpur: subdir.js
const __filename = fileURLToPath(import.meta.url)

// output: routes
const __dirname = path.dirname(__filename)

const router = express.Router()


// .. beacause currently we are in routes we should not go routes/subdir/index.html we should go project/views/subdir/index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'))
})

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'))
})


export default router