const express = require('express');
const router = express.Router();

const {
    getBus,
    addBus,
    updateBus,
    deleteBus
} = require('../controllers/bus');

router.get('/', getBus);
router.post('/', addBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

module.exports = router;
