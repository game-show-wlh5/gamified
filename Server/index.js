require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const ctrl = require('./Controllers/AuthController')
const roomCtrl = require('./Controllers/GameController')
const app = express()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const SocketConnection = require('./Controllers/SocketController')

// SocketConnection(server)
app.use(express.json())
// app.use(express.static(`${_dirname}/../build`))
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

//GET ENDPOINTS
app.get('/auth/gamecentral', authController.accessGameCentral);
app.get('/auth/admin', authController.getAdmin);
app.get('/auth/logout', authController.logout);
//POST ENDPOINTS
app.post('/user', roomCtrl.createUser)
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/game/create', roomCtrl.createGame)

//PUT ENDPOINTS


//DELETE ENDPOINTS





massive(CONNECTION_STRING).then((database) => {
    app.set('db', database)
    app.listen(SERVER_PORT, () => console.log(`Hulk Smashing on ${SERVER_PORT}`))
})


