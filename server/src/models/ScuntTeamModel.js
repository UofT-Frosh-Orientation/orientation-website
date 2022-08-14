const mongoose = require('mongoose');

const ScuntTeamSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  transactions: [
    {
      type: new mongoose.Schema(
        {
          name: { type: String, default: '' },
          points: { type: Number, default: 0 },
          missionNumber: { type: Number, default: -1 },
        },
        { timestamps: true },
      ),
    },
  ],
});

const ScuntTeamModel = mongoose.model('ScuntTeam', ScuntTeamSchema);

module.exports = ScuntTeamModel;