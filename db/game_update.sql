-- Use this to edit an existing game
UPDATE games
SET game_title = ${game_title},
    game_intro = ${game_intro}
WHERE games.id = ${game_id};