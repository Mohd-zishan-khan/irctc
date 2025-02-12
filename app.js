const express = require('express');
   const bodyParser = require('body-parser');
   const cors = require('cors');
   const authRoutes = require('./routes/authRoutes');
   const trainRoutes = require('./routes/trainRoutes');
   const bookingRoutes = require('./routes/bookingRoutes');
   require('dotenv').config();

   const app = express();

   // Middleware
   app.use(bodyParser.json());
   app.use(cors());

   // Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/trains', trainRoutes);
   app.use('/api/bookings', bookingRoutes);

   // Start Server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });