const mongoose = require('mongoose');

const archivedVersionSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
      index: true
    },
    versionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    delta: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    editedAt: {
      type: Date,
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

archivedVersionSchema.index({ contentId: 1, editedAt: -1 });

module.exports = mongoose.model('ArchivedVersion', archivedVersionSchema);
