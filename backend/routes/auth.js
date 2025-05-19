const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting account' });
  }
});

module.exports = router;