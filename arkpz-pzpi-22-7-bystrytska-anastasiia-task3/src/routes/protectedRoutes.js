const express = require('express');
const router = express.Router();
const sessionAuth = require('../middleware/sessionAuth');

router.get('/dashboard', sessionAuth, (req, res) => {
  res.json({ message: `Ласкаво просимо, ${req.session.user.username}!`, role: req.session.user.role });
});

module.exports = router;
