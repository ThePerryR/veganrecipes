import express from 'express'
import dotEnv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import favicon from 'serve-favicon'

import serveReactApp from './utils/serveReactApp'
import register from './utils/auth/register'
import login from './utils/auth/login'
import User from './schemas/User'
import api from './api'
import generateSitemap from './utils/generateSitemap'

dotEnv.config()

const app = express()
const clientPromise = mongoose.connect(`${process.env.DB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
}).then(m => m.connection.getClient())
const store = MongoStore.create({ clientPromise })

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, './public')))
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))
// app.use(express.cookieParser());
app.use(bodyParser.json())
app.use(session({
  secret: '328lskfw920fOl',
  store,
  resave: false,
  saveUninitialized: false,
  rolling: true
}))
app.use(passport.initialize({}))
app.use(passport.session({}))
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.listen(app.get('port'), () => console.log('Listening on port: ', app.get('port')))

app.get('/sitemap.xml', generateSitemap)

app.post('/register', register)
app.post('/login', login)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/api', api())

app.get('*', serveReactApp)
