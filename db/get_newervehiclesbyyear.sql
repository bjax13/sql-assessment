select vehicles.id, make, model, year, firstname , lastname from vehicles JOIN users
    ON ownerId = users.id where year >2000 order by year;
