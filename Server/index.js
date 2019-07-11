require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./Controllers/AuthController')
const gameCtrl = require('./Controllers/GameController')
const app = express()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const SocketConnection = require('./Controllers/SocketController')

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))
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
    app.get('/game/getquestions', gameCtrl.getGameQuestions)
    app.get('/gamecentral/games', gameCtrl.getUserGames)
    app.get('/getgame/:id', gameCtrl.getGameDetails)
    
    //POST ENDPOINTS
    app.post('/user', gameCtrl.createUser)
    app.post('/game/create', gameCtrl.createGame)
    app.post('/game/addquestion',gameCtrl.addQuestion)
    app.post('/joingame', gameCtrl.joinGame)
    
    app.post('/auth/register', authController.register);
    app.post('/auth/login', authController.login);
    
    //PUT ENDPOINTS
    app.put('/user/:id', gameCtrl.editUser)
    app.put('/game/edit',gameCtrl.editGame)
    //DELETE ENDPOINTS
    app.delete('/deletequestion/:id', gameCtrl.deleteQuestion)
    app.delete('/deletegame/:id', gameCtrl.deleteGame)
    app.delete('/deleteuser', gameCtrl.deleteUserFromLobby)
    app.delete('/removeuser', gameCtrl.removedUser)

    
    
    
    massive(CONNECTION_STRING).then((database) => {
        app.set('db', database)
        console.log('Database is set')
    })
    const server = app.listen(SERVER_PORT, () => console.log(`Hulk Smashing on ${SERVER_PORT}`))
    SocketConnection(server, app)
    
    
    