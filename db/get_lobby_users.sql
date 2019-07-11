SELECT gamelobby.*, score FROM gamelobby 
JOIN users
ON users.username = gamelobby.username
WHERE game_id = ${game_id}

