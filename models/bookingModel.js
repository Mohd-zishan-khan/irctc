const db = require('../config/db');

   const Booking = {
       bookSeat: (userId, trainId, seatsBooked, callback) => {
           const query = 'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)';
           db.query(query, [userId, trainId, seatsBooked], callback);
       },
       updateAvailableSeats: (trainId, seatsBooked, callback) => {
           const query = 'UPDATE trains SET available_seats = available_seats - ? WHERE id = ? AND available_seats >= ?';
           db.query(query, [seatsBooked, trainId, seatsBooked], callback);
       },
       getBookingDetails: (bookingId, callback) => {
           const query = 'SELECT * FROM bookings WHERE id = ?';
           db.query(query, [bookingId], callback);
       }
   };

   module.exports = Booking;