const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/header', verifyToken, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.user });
});

module.exports = router;
