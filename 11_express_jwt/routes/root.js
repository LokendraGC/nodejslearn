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

// 404 - page not found
router.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, '..', 'views', '404.html')
    )
})

export default router;