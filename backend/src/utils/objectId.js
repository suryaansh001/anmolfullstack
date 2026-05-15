const mongoose = require('mongoose');

function toObjectId(value) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }

  return new mongoose.Types.ObjectId(value);
}

module.exports = {
  toObjectId
};
