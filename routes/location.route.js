const express = require('express');
const router = express.Router();

const {
    getBusLastLocation,
    addBustLastLocation
} = require('../controllers/location.controller');

router.get('/', getBusLastLocation);
router.post('/', addBustLastLocation);

module.exports = router;
