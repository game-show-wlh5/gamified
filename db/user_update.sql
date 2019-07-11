-- Use this to add additional info (score, results) to a user.
UPDATE users
SET score = ${score}
WHERE ID = ${id};
