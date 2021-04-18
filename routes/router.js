const express = require('express');

const router = express.Router();

const accountTransfer = require('../controller/useCase1.js');
const ercToken = require('../controller/invoke.js');

router.get('/accountTransfer',accountTransfer.getDetails);
router.get('/ercToken/:value',ercToken.getDetails);
module.exports = router;