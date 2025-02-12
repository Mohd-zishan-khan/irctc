const jwt = require('jsonwebtoken');
   require('dotenv').config();

   const authAdminMiddleware = (role) => (req, res, next) => {
       const token = req.header('Authorization')?.replace('Bearer ', '');
       if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

       try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET2);
           if (role && decoded.role !== role) {
               return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
           }
           req.user = decoded;
           next();
       } catch (err) {
           res.status(400).json({ error: 'Invalid token.' });
       }
   };

   module.exports = authAdminMiddleware;