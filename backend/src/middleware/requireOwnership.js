const Content = require('../models/Content');
const { toObjectId } = require('../utils/objectId');

async function requireOwnership(req, res, next) {
  const contentId = toObjectId(req.params.id);

  if (!contentId) {
    return res.status(400).json({ error: 'Invalid content id' });
  }

  const content = await Content.findById(contentId).select('authorId isDeleted');

  if (!content || content.isDeleted) {
    return res.status(404).json({ error: 'Content not found' });
  }

  if (content.authorId.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  return next();
}

module.exports = requireOwnership;
