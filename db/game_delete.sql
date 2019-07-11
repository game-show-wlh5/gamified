-- Use this to delete game. Notice that this will also remove the references to the other db tables.
-- DELETE FROM users
-- WHERE games_id = ${id};

DELETE FROM questions
WHERE games_id = ${id};

DELETE FROM games
WHERE id = ${id}; 