SELECT *
  FROM vehicles JOIN users
    ON ownerId = users.id
 WHERE firstname like $1
