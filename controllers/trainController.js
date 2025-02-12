const Train = require('../models/trainModel');

   const addTrain = (req, res) => {
       const { trainName, source, destination, totalSeats } = req.body;
       Train.addTrain(trainName, source, destination, totalSeats, (err, result) => {
           if (err) return res.status(500).json({ error: err.message });
           res.status(201).json({ message: 'Train added successfully' });
       });
   };

   const getTrains = (req, res) => {
       const { source, destination } = req.query;
       Train.getTrains(source, destination, (err, results) => {
           if (err) return res.status(500).json({ error: err.message });
           res.json(results);
       });
   };

   module.exports = { addTrain, getTrains };