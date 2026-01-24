const express = require('express');
const { getUserResult } = require('../controllers/resultcontroller.js');
const protect = require('../middleware/auth.js');
const router = express.Router();

router.get('/:userId', protect, getUserResult);

module.exports = router;