const mongoose = require('mongoose');
const getResponseObject = require('../util/getResponseObject');

const ScuntGameSettingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Scunt 2T2 Settings',
  },
  amountOfTeams: {
    type: Number,
    required: false,
    default: 10,
  },
  // Set all judges bribe points to this number when the game starts (/users/scunt-judge-users) and (/scunt-teams/transaction-refill-bribe)
  amountOfStarterBribePoints: {
    type: Number,
    required: false,
    default: 10000,
  },
  // The max amount of points allowed to be given out over the recommended amount for missions
  maxAmountPointsPercent: {
    type: Number,
    required: false,
    default: 0.3,
  },
  // The min amount of points allowed to be given out over the recommended amount for missions
  minAmountPointsPercent: {
    type: Number,
    required: false,
    default: 0.3,
  },
  revealJudgesAndBribes: {
    type: Boolean,
    required: false,
    default: false,
  },
  revealTeams: {
    type: Boolean,
    required: false,
    default: false,
  },
  showDiscordLink: {
    type: Boolean,
    required: false,
    default: false,
  },
  discordLink: {
    type: String,
    required: true,
    default: 'https://discord.gg/mRutbwuCK9',
  },
  revealLeaderboard: {
    type: Boolean,
    required: false,
    default: false,
  },
  revealMissions: {
    type: Boolean,
    required: false,
    default: false,
  },
  allowJudging: {
    type: Boolean,
    required: false,
    default: false,
  },
  scuntDate: {
    type: String,
    required: false,
    default: 'September 7, 2022 18:00:00',
  },
});

ScuntGameSettingSchema.methods.getResponseObject = getResponseObject;
const ScuntGameSettingModel = mongoose.model('ScuntGameSetting', ScuntGameSettingSchema);
module.exports = ScuntGameSettingModel;
