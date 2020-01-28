const express = require('express');
const router = express.Router();

// Dashboard
router.get('/dashboard', (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;