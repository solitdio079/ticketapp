import {} from 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.mjs'
import usersRouter from './routes/users.mjs'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import path from 'node:path'


try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to database')
} catch (error) {
  console.log(error.message) 
}

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  
}
const __dirname = path.resolve()
const app = express()
app.use('/static', express.static(path.join(__dirname,'uploads')))
app.use(cors(corsOptions))
app.use(cookieParser('my-secret'))

app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send({ msg: 'Home Page', data: null })
})

app.listen(port, () => {
  console.log(`Listening to port:${port}`)
})
