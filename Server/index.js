require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const ctrl = require('./controller')
const app = express()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(express.static(`${_dirname}/../build`))
app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
)

massive(CONNECTION_STRING).then((database) => {
    app.set('db', database)
    app.listen(SERVER_PORT, () => console.log(`Hulk Smashing on ${SERVER_PORT}`))
})