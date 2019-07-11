SELECT *
from questions
INNER JOIN games
ON questions.games_id = games.id
WHERE games.gameroom_id = $1