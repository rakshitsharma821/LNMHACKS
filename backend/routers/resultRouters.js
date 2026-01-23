const express = require('express');
const { getUserResult } = require('../../controllers/resultController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/:userId', protect, getUserResult);

module.exports = router;
