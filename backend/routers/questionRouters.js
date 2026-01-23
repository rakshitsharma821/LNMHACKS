const express = require('express');
const { getQuestions, submitAnswers, seedQuestions } = require('../../controllers/questionController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getQuestions);
router.post('/submit-answers', protect, submitAnswers);
// Route for seeding questions - use only for development/hackathon setup
router.post('/seed', seedQuestions); // No protection for initial seeding

module.exports = router;
