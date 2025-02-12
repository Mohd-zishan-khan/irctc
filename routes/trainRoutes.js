const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const authAdminMiddleware = require('../middleware/authadminMiddleware');


const router = express.Router();

router.post('/add', authAdminMiddleware("admin"), addTrain);
router.get('/search', getTrains);

module.exports = router;