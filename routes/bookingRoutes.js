const express = require('express');
   const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
   const authMiddleware = require('../middleware/authMiddleware');

   const router = express.Router();

   // Book a seat (only logged-in users)
   router.post('/book', authMiddleware('user'), bookSeat);

   // Get booking details (only logged-in users)
   router.get('/:bookingId', authMiddleware('user'), getBookingDetails);

   module.exports = router;