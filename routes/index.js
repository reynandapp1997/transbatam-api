const express = require('express');
const router = express.Router();

const busRouter = require('./bus');
const locationRouter = require('./location');

router.use('/bus', busRouter);
router.use('/location', locationRouter);

module.exports = router;
