const db = require('../config/db');

   const Train = {
       addTrain: (trainName, source, destination, totalSeats, callback) => {
           const query = 'INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)';
           db.query(query, [trainName, source, destination, totalSeats, totalSeats], callback);
       },
       getTrains: (source, destination, callback) => {
           const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
           db.query(query, [source, destination], callback);
       },

       getTrainById: (trainId, callback) => {
        const query = 'SELECT * FROM trains WHERE id = ?';
        db.query(query, [trainId], callback);
    }
   };

   module.exports = Train;




