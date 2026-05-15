const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ratingSchema.index({ contentId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
