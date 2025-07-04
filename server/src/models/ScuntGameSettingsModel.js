const mongoose = require('mongoose');
const getResponseObject = require('../util/getResponseObject');

const ScuntGameSettingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Skule™ Hunt 2T4 Settings',
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
  // The max percentage of points allowed to be given out (enter as decimal value: 1.3 = 130%)
  maxAmountPointsPercent: {
    type: Number,
    required: false,
    default: 1.3,
  },
  // The min percentage of points allowed to be given out (enter as decimal value: 0.5 = 50%)
  minAmountPointsPercent: {
    type: Number,
    required: false,
    default: 0.5,
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
  // showDiscordLink: {
  //   type: Boolean,
  //   required: false,
  //   default: false,
  // },
  // discordLink: {
  //   type: String,
  //   required: true,
  //   default: 'https://discord.gg/Fnxr7tp34E',
  // },
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
    default: 'August 28, 2024 18:00:00',
  },
});

ScuntGameSettingSchema.methods.getResponseObject = getResponseObject;
const ScuntGameSettingModel = mongoose.model('ScuntGameSetting', ScuntGameSettingSchema);
module.exports = ScuntGameSettingModel;
