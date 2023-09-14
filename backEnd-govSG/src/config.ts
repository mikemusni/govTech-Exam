import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import userRoutes from './routes/user'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/user', userRoutes)

export default app
