const socket = require("socket.io");
const SocketConnection = (server, app) => {
  const io = socket(server);

  io.on("connection", socket => {
    console.log("A user has connected");
    // console.log(socket.id);
    const db = app.get("db");
    socket.on("username", username => {
      socket.username = username;
    });
    socket.on("join room", async gameID => {
      socket.join(gameID);
      const users = await db.get_lobby_users({ game_id: gameID });
      io.in(gameID).emit("room joined", users);
    });
    socket.on("leave room", async (username, gameID) => {
      await db.delete_user_lobby({username});
      // console.log(db.get_lobby_users)
      const users = await db.get_lobby_users({ game_id: gameID });
      await socket.disconnect();
      // console.log(users)
      await io.to(gameID).emit("room joined", users);
      // console.log(username);
      // console.log(gameID);
    });
    socket.on("end game", gameID => {
      socket.to(gameID).emit("end room");
    });
    socket.on("finish game", async (data) => {
      const { gameID, username, userID, score } = data;
      await db.user_update({id: userID, score})
      const users = await db.get_lobby_users({ game_id: gameID });
      io.in(gameID).emit("finishedGame", users)
      // console.log(data);
    });
  });
};

module.exports = SocketConnection;
