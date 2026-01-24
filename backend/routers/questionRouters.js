const express = require('express');
const { getQuestions, submitAnswers, seedQuestions } = require('../controllers/questioncontrollers.js');
const protect = require('../middleware/auth.js');
const router = express.Router();

router.get('/', protect, getQuestions);
router.post('/submit-answers', protect, submitAnswers);

router.post('/seed', seedQuestions); 

module.exports = router;