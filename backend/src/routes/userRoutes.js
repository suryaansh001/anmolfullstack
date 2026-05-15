const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { profileStats } = require('../services/contentService');

const router = express.Router();

router.get(
  '/:id/profile-stats',
  asyncHandler(async (req, res) => {
    const data = await profileStats(req.params.id);

    if (!data) {
      return res.status(404).json({ error: 'User or author stats not found' });
    }

    return res.json({ data });
  })
);

module.exports = router;
