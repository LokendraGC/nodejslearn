import express from 'express'
import path from 'path'
import { logger } from './middleware/logEvents.js'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import subdirRouter from './routes/subdir.js'
import rootRouter from './routes/root.js'
import employeeRouter from './routes/api/employee.js'

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger);

// cors - cross origin resource sharing third party middleware
const whiteList = ['https://www.google.com', 'http://localhost:3500']

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

// built in middleware to handle urlencoded data
// In other words, form data:
// content-type:application/x-wcww-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// built in middleware for json
app.use(express.json())

// built in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/',rootRouter);

app.use('/api/employee', employeeRouter)

// For any request that starts with /subdir, use the routes from subdir.js
app.use('/subdir', subdirRouter)


// express built in error handling middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))