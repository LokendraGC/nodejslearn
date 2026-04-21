import express from 'express'
import path from 'path'
import { logger } from './middleware/logEvents.js'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import rootRouter from './routes/root.js'
import employeeRouter from './routes/api/employee.js'
import registerRouter from './routes/api/register.js'
import loginRouter from './routes/api/login.js'
import refreshRouter from './routes/api/refreshToken.js'
import logoutRouter from './routes/api/logout.js'
import { corsOptions } from './config/corsOptions.js'
import dotenv from 'dotenv'
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger);

// cors - cross origin resource sharing third party middleware
app.use(cors(corsOptions))

// built in middleware to handle urlencoded data
// In other words, form data:
// content-type:application/x-wcww-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// built in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// built in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/employee', verifyJWT, employeeRouter)

app.use('/api',registerRouter)

app.use('/api',loginRouter)

app.use('/api/refresh', refreshRouter)  

app.use('/api/logout', logoutRouter)

app.use('/',rootRouter);

// express built in error handling middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))