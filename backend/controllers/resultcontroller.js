const Result = require('../models/result.js');


const getUserResult = async (req, res) => {
  try {
   
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