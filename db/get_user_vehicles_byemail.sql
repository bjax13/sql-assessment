SELECT *
  FROM vehicles JOIN users
    ON ownerId = users.id
 WHERE email = $1;
