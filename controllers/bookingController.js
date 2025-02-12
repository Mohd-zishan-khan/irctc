const Booking = require('../models/bookingModel');
   const Train = require('../models/trainModel');

   const bookSeat = (req, res) => {
       const { trainId, seatsBooked } = req.body;
       const userId = req.user.id; // Extracted from JWT token

       // Start a transaction to handle race conditions
       db.beginTransaction((err) => {
           if (err) return res.status(500).json({ error: 'Transaction failed' });

           // Check if seats are available 
           Train.getTrainById(trainId, (err, results) => {
               if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
               if (results.length === 0 || results[0].available_seats < seatsBooked) {
                   return db.rollback(() => res.status(400).json({ error: 'Not enough seats available' }));
               }

               // Update available seats
               Booking.updateAvailableSeats(trainId, seatsBooked, (err, result) => {
                   if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                   // Book the seat
                   Booking.bookSeat(userId, trainId, seatsBooked, (err, result) => {
                       if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                       db.commit((err) => {
                           if (err) return db.rollback(() => res.status(500).json({ error: 'Commit failed' }));
                           res.status(201).json({ message: 'Seat booked successfully', bookingId: result.insertId });
                       });
                   });
               });
           });
       });
   };

   const getBookingDetails = (req, res) => {
       const { bookingId } = req.params;
       Booking.getBookingDetails(bookingId, (err, results) => {
           if (err) return res.status(500).json({ error: err.message });
           if (results.length === 0) return res.status(404).json({ error: 'Booking not found' });
           res.json(results[0]);
       });
   };

   module.exports = { bookSeat, getBookingDetails };