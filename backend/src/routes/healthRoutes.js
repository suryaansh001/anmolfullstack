const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'akshar-backend' });
});

router.get('/ready', (req, res) => {
  res.json({ status: 'ready' });
});

module.exports = router;
