const mongoose = require('mongoose');

const ScuntTeamTransactionsSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    points: { type: Number, default: 0 },
    missionNumber: { type: Number, default: -1, index: true },
  },
  { timestamps: true },
);

ScuntTeamTransactionsSchema.index({ createdAt: -1 });

const ScuntTeamSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
    default: 0,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: [ScuntTeamTransactionsSchema],
});

const ScuntTeamModel = mongoose.model('ScuntTeam', ScuntTeamSchema);

module.exports = ScuntTeamModel;
