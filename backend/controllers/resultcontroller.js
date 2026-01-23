const Result = require('../backend/models/result');

// @desc    Get user's latest result
// @route   GET /api/result/:userId
// @access  Private (requires authentication)
const getUserResult = async (req, res) => {
  try {
    // Ensure the user requesting the result is the owner of the result
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Not authorized to view this result' });
    }

    const result = await Result.findOne({ user: req.params.userId }).select('-user -createdAt');

    if (!result) {
      return res.status(404).json({ message: 'No results found for this user.' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserResult,
};
