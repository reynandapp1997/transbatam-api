const express = require('express');
const router = express.Router();

const busRouter = require('./bus.route');
const locationRouter = require('./location.route');

router.use('/bus', busRouter);
router.use('/location', locationRouter);

module.exports = router;
