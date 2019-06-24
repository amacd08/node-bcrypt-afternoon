const express = require('express')
require('dotenv').config()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const session = require('express-session')
const massive = require('massive')
const ac = require('./controllers/authCountroller')
const tc = require('./controllers/treasureController')
const am = require('./middleware/authMiddleware')

const app=express()

app.use(express.json())
massive(CONNECTION_STRING).then(db => {
    console.log('db connection established')
    app.set('db',db)
})
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAg: 1000*60*60
    }
  })
)

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)

app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', am.usersOnly, tc.getUserTreasure)

app.post('/api/treasure/user',am.usersOnly, tc.addUserTreasure )
app.get('/api/treasure/all', am.usersOnly, tc.getAllTreasure )



app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`))
