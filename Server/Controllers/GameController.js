const uuid = require("uuid/v1");

module.exports = {
  createUser: (req, res) => {
    const { username } = req.body;
    req.session.user = {
      username
    };
    res.status(200).send(req.session.user);
  },
  checkUser: (req, res, next) => {
    if (req.session.user.username) {
      next();
    } else {
      res.status(401).send("Please login");
    }
  },
  createGame: async (req, res) => {
    const gameID = uuid();
    console.log(req.body)
    const {admins_id,game_title,game_intro} = req.body
    const { session } = req;
    const db = req.app.get("db");
    if (session) {
      const gameInfo = await db.game_create_new({
        admins_id: admins_id, 
        // admins_id: session.admins.id, 
        game_title: game_title, 
        game_intro: game_intro, // is this meant as the instructions?
        gameroom_id: gameID // do we want this to be sequential in DB?// what do we need here?
      });
      res.status(200).send(gameInfo);
    }
  },

  getUserGames: async (req,res) => {
    const dbInstance = await req.app.get('db');
    const id = req.session.admin.id
    console.log(id,'Made it to Game Controller',req.session,req.session.admin.id)
    dbInstance.games_get_all_by_id({id})

    .then(game => res.status(200).send(game))
    .catch(err => {
      res.status(500).send({errorMessage: 'Crap it broke'})
      console.log(err)
    })
    
  },
    
  // }

  joinGame: (req, res) => {
    const { gameID } = req.body;
    const db = req.app.get("db");
    const getGame = db.get_game({ gameroom_id: gameID });
    if (getGame[0]) {
      res.status(200).send(getGame[0], "Joined game!");
    } else {
      res.status(404).send("Game not found");
    }
  }
};
