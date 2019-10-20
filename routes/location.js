const express = require('express');
const router = express.Router();

const {
    getBusLastLocation,
    addBustLastLocation
} = require('../controllers/location');

router.get('/:id', getBusLastLocation);
router.post('/', addBustLastLocation);

module.exports = router;
