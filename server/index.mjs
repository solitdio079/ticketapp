import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.mjs'
import passport from 'passport'
import MongoStore from 'connect-mongo'

try {
    console.log(process.env.EMAIL);
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
} catch (error) {
    console.log(error.message)
}

const app = express()
app.use(cookieParser("my-secret"))
app.use(express.json())
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    cookie: {
      secure: true,
    },
    saveUninitialized: false,
    /*store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'ticketsDB',
    }),*/
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send({msg:"Home Page", data:[]})
})

app.listen(port, () => {
    console.log(`Listening to port:${port}`);
})