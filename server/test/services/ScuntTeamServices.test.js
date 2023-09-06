/* eslint-disable no-undef */
const ScuntTeamServices = require('../../src/services/ScuntTeamServices');
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const LeadurModel = require('../../src/models/LeadurModel');
const UserModel = require('../../src/models/UserModel');
const ScuntTeamModel = require('../../src/models/ScuntTeamModel');
const ScuntMissionModel = require('../../src/models/ScuntMissionModel');
const ScuntGameSettingModel = require('../../src/models/ScuntGameSettingsModel');
const assert = require('assert');
const FroshModel = require('../../src/models/FroshModel');

describe('ScuntTeamServices', () => {
  let testLeadur;
  let team;
  let teamPoints = [];
  let teams = [];
  let scuntJudges = [];
  let tranactions = [];

  it('.getTeams()\t\t\t|\tShould return array with teams (NO TEAMS)', async () => {
    await assert.rejects(ScuntTeamServices.getTeams(), {
      name: 'Error',
      message: 'TEAMS_NOT_FOUND',
    });
  });

  it('.viewRecentTransactions()\t\t|\tView recent transactions (empty)', async () => {
    await assert.rejects(ScuntTeamServices.viewRecentTransactions(), {
      name: 'Error',
      message: 'TRANSACTIONS_NOT_FOUND',
    });
  });

  it('.updateLeaderTeam()\t\t|\tUpdate a leaders scunt team number', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testing',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test01@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
    });
    testLeadur = await ScuntTeamServices.updateLeaderTeam(leadur._id, 2);
    assert(testLeadur.scuntTeam === 2);
  });

  it('.updateLeaderTeam()\t\t|\tUpdate a leaders scunt team number with wrong ID (UNABLE TO UPDATE LEADER)', async () => {
    await assert.rejects(ScuntTeamServices.updateLeaderTeam('   ', 3), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_LEADER',
    });
  });

  it('.updateLeaderTeam()\t\t|\tUpdate a non-leaders scunt team number (LEADUR_NOT_FOUND)', async () => {
    testUser = await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test2@test.utoronto.ca',
      hashedPassword: 'test',
    });
    await assert.rejects(ScuntTeamServices.updateLeaderTeam(testUser._id, 3), {
      name: 'Error',
      message: 'LEADUR_NOT_FOUND',
    });
  });

  it('.getTeamPoints()\t\t\t|\tShould return array with teams and their points', async () => {
    await assert.rejects(ScuntTeamServices.getTeamPoints(), {
      name: 'Error',
      message: 'TEAMS_NOT_FOUND',
    });
  });

  it('.getTeamPoints()\t\t\t|\tShould return array with teams and their points', async () => {
    await ScuntTeamModel.create({
      name: 'Test Team',
      points: 10,
    });
    teamPoints = await ScuntTeamServices.getTeamPoints();
    assert(teamPoints.length === 1);
  });

  it('.getTeams()\t\t\t|\tShould return array with teams', async () => {
    teams = await ScuntTeamServices.getTeams();
    assert(teams.length > 0);
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (INVALID_SETTINGS)', async () => {
    await ScuntGameSettingModel.collection.drop();
    await assert.rejects(
      ScuntTeamServices.bribeTransaction(8, 10, { scuntJudgeBribePoints: 10000 }),
      {
        name: 'Error',
        message: 'INVALID_SETTINGS',
      },
    );
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (NOT_ALLOWED_TO_JUDGE)', async () => {
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: false } },
      { upsert: true },
    );
    await assert.rejects(
      ScuntTeamServices.bribeTransaction(8, 10, { scuntJudgeBribePoints: 10000 }),
      {
        name: 'Error',
        message: 'NOT_ALLOWED_TO_JUDGE',
      },
    );
    ScuntGameSettingModel.collection.drop();
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (LEADUR_NOT_FOUND)', async () => {
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: true } },
      { upsert: true },
    );
    await assert.rejects(
      ScuntTeamServices.bribeTransaction(8, 10, { scuntJudgeBribePoints: 10000 }),
      {
        name: 'Error',
        message: 'LEADUR_NOT_FOUND',
      },
    );
    ScuntGameSettingModel.collection.drop();
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction', async () => {
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: true } },
      { upsert: true },
    );
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test3@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 2000,
    });

    await ScuntTeamModel.create({
      number: 8,
      name: 'Scunt Team 8',
      points: 20,
    });

    const { testLeadur } = await ScuntTeamServices.bribeTransaction(8, 10, leadur);
    assert(testLeadur !== null);
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (NOT ENOUGH BRIBE POINTS)', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test4@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 1,
    });
    await assert.rejects(ScuntTeamServices.bribeTransaction(8, 3000, leadur), {
      name: 'Error',
      message: 'NOT_ENOUGH_BRIBE_POINTS',
    });
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (INVALID_TEAM_NUMBER)', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test4@t43534est.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 1000000,
    });
    await assert.rejects(ScuntTeamServices.bribeTransaction(1200, 3000, leadur), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });

  it('.bribeTransaction()\t\t|\tUpdate a bribe transaction (UNABLE_TO_UPDATE_TEAM)', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test4@t4355345534est.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 1000000,
    });
    await assert.rejects(ScuntTeamServices.bribeTransaction('dfsdf', 3000, leadur), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_TEAM',
    });
  });

  it('.getScuntJudges()\t\t\t|\tShould return array with scunt judges', async () => {
    await assert.rejects(ScuntTeamServices.getScuntJudges(), {
      name: 'Error',
      message: 'JUDGES_NOT_FOUND',
    });
  });

  it('.getScuntJudges()\t\t\t|\tShould return array with scunt judges', async () => {
    await LeadurModel.create({
      lastName: 'Testersen',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test14@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      authScopes: {
        approved: ['scunt:judge bribe points'],
      },
      scuntJudgeBribePoints: 20,
    });
    const judges = await ScuntTeamServices.getScuntJudges();
    assert(judges.length === 1);
  });

  it('.refillBribePoints()\t\t|\tRefill judge bribe points', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test6@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 20,
    });
    const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur._id, 10, true);
    assert(refilledleadur.scuntJudgeBribePoints === 30);
  });

  it('.refillBribePoints()\t\t|\tRefill judge bribe points', async () => {
    const leadur = await LeadurModel.create({
      lastName: 'Testerson',
      firstName: 'Test',
      approved: true,
      hashedPassword: 'test12345',
      email: 'test7@test.utoronto.ca',
      froshDataFields: {},
      scuntTeam: 1,
      scuntJudgeBribePoints: 20,
    });
    const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur._id, 10, false);
    assert(refilledleadur.scuntJudgeBribePoints === 10);
  });

  it('.refillBribePoints()\t\t|\tRefill judge bribe points with wrong ID (UNABLE TO UPDATE LEADUR)', async () => {
    await assert.rejects(ScuntTeamServices.refillBribePoints('1234567890', 10, true), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_LEADUR',
    });
  });

  it('.refillBribePoints()\t\t|\tRefill judge bribe points with wrong ID (LEADUR_NOT_FOUND)', async () => {
    testUser = await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test8@test.utoronto.ca',
      hashedPassword: 'test',
    });
    await assert.rejects(ScuntTeamServices.refillBribePoints(testUser._id, 10, true), {
      name: 'Error',
      message: 'LEADUR_NOT_FOUND',
    });
  });

  it('.addTransaction()\t\t\t|\tAdd transaction', async () => {
    await ScuntGameSettingsServices.initScuntGameSettings();
    await ScuntTeamModel.create({
      number: 1,
      name: 'Scunt Team 1',
      points: 0,
    });
    const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 2, 20);
    assert.equal(testTeamTransaction, 'Added 20 points for mission #2 for team 1');
  });

  it('.addTransaction()\t\t\t|\tAdd transaction same mission', async () => {
    const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 2, 200);
    assert.equal(testTeamTransaction, 'Updated to 200 points for mission #2 for team 1');
  });

  it('.addTransaction()\t\t\t|\tAdd transaction same mission', async () => {
    const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 2, 10);
    assert.equal(testTeamTransaction, '10 points for mission #2 for team 1');
  });

  it('.addTransaction()\t\t\t|\tAdd transaction', async () => {
    await ScuntTeamModel.create({
      number: 9,
      name: 'Scunt Team 9',
      points: 20,
    });
    const testTeamTransaction = await ScuntTeamServices.addTransaction(9, 2, 30);
    assert.equal(testTeamTransaction, 'Added 30 points for mission #2 for team 9');
  });

  // having trouble with prev points with addTransaction

  it('.addTransaction()\t\t\t|\tAdd transaction (INVALID_SETTINGS)', async () => {
    await ScuntGameSettingModel.collection.drop();
    await assert.rejects(ScuntTeamServices.addTransaction(100000, 2, 20), {
      name: 'Error',
      message: 'INVALID_SETTINGS',
    });
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: true } },
      { upsert: true },
    );
  });

  it('.addTransaction()\t\t\t|\tAdd transaction (NOT_ALLOWED_TO_JUDGE)', async () => {
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: false } },
      { upsert: true },
    );
    await assert.rejects(ScuntTeamServices.addTransaction(100000, 2, 20), {
      name: 'Error',
      message: 'NOT_ALLOWED_TO_JUDGE',
    });
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: true } },
      { upsert: true },
    );
  });

  it('.addTransaction()\t\t\t|\tAdd transaction (INVALID TEAM)', async () => {
    await assert.rejects(ScuntTeamServices.addTransaction(100000, 2, 20), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });

  it('.subtractTransaction()\t\t|\tSubtract transaction', async () => {
    await ScuntTeamModel.create({
      number: 2,
      name: 'Scunt Team 2',
      points: 20,
    });
    const testTeam = await ScuntTeamServices.subtractTransaction(2, 20);
    assert(testTeam.points === 0);
  });

  it('.subtractTransaction()\t\t|\tSubtract transaction', async () => {
    await ScuntTeamModel.create({
      number: 10,
      name: 'Scunt Team 10',
      points: 10,
    });
    const testTeam = await ScuntTeamServices.subtractTransaction(10, 20);
    assert(testTeam.points === -10);
  });

  it('.subtractTransaction()\t\t|\tSubtract transaction (INVALID TEAM)', async () => {
    await assert.rejects(ScuntTeamServices.subtractTransaction(100000, 20), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });

  it('.viewTransactions()\t\t|\tView transactions', async () => {
    await ScuntTeamServices.subtractTransaction(10, 20);
    await ScuntTeamServices.subtractTransaction(10, 20);
    await ScuntTeamServices.subtractTransaction(10, 20);
    const transactions = await ScuntTeamServices.viewTransactions(10);
    assert.equal(transactions.length, 4);
  });

  it('.viewTransactions()\t\t|\tView transactions (INVALID TEAM)', async () => {
    await assert.rejects(ScuntTeamServices.viewTransactions(100000), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });

  it('.checkTransaction()\t\t|\tCheck a transaction', async () => {
    await ScuntTeamModel.create({
      number: 4,
      name: 'Scunt Team 4',
      points: 10,
    });
    await ScuntMissionModel.create({
      number: 1,
      name: 'Test Mission',
      category: '',
      points: 10,
      isHidden: false,
      isJudgingStation: false,
    });
    const points = await ScuntTeamServices.checkTransaction(4, 1);
    assert.equal(points, 0);
  });

  it('.checkTransaction()\t\t|\tCheck a transaction', async () => {
    await ScuntTeamServices.addTransaction(4, 1, 20);
    await ScuntTeamServices.addTransaction(4, 1, 10);
    const points = await ScuntTeamServices.checkTransaction(4, 1);
    assert.equal(points, 31);
  });

  it('.checkTransaction()\t\t|\tCheck a transaction (INVALID TEAM NUMBER)', async () => {
    await assert.rejects(ScuntTeamServices.checkTransaction(1000, 10), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });

  it('.initializeTeams()\t\t|\tInitialize scunt teams (INVALID_SETTINGS)', async () => {
    await ScuntGameSettingModel.collection.drop();
    await assert.rejects(ScuntTeamServices.initializeTeams(), {
      name: 'Error',
      message: 'INVALID_SETTINGS',
    });
  });

  it('.initializeTeams()\t\t|\tInitialize scunt teams (MISSING_SCUNT_SETTINGS)', async () => {
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { amountOfTeams: null } },
      { upsert: true },
    );
    await assert.rejects(ScuntTeamServices.initializeTeams(), {
      name: 'Error',
      message: 'MISSING_SCUNT_SETTINGS',
    });
    await ScuntGameSettingModel.collection.drop();
    await ScuntGameSettingModel.findOneAndUpdate(
      {},
      { $set: { allowJudging: true, amountOfTeams: 10 } },
      { upsert: true },
    );
  });

  it('.initializeTeams()\t\t|\tInitialize scunt teams (SCUNT_FROSH_NOT_FOUND)', async () => {
    await ScuntTeamModel.collection.drop();
    await FroshModel.collection.drop();
    await assert.rejects(ScuntTeamServices.initializeTeams(), {
      name: 'Error',
      message: 'SCUNT_FROSH_NOT_FOUND',
    });
  });

  it('.initializeTeams()\t\t|\tInitialize scunt teams', async () => {
    await ScuntTeamModel.collection.drop();
    for (let i = 0; i < 10; i += 1) {
      await FroshModel.create({
        scuntPreferredMembers: [1, 2, 3].includes(i)
          ? ['test1@test.com', 'test2@test.com', 'test3@test.com']
          : i === 4
          ? ['fdfgdfgdfgdfgdfgdfgdfgdf', 'test1@test.com', 'test2@test.com']
          : i === 5
          ? ['test4@test.com', 'test2@test.com', 'test3@test.com']
          : [],
        hashedPassword: 'test',
        firstName: `Test ${i}`,
        lastName: `Test ${i}`,
        email: `test${i}@test.com`,
        legalName: `Test ${i}`,
        pronouns: 'Other',
        birthDate: new Date(),
        utorid: 'test123',
        discipline: 'Chemical',
        shirtSize: 'L',
        phoneNumber: '123456',
        emergencyContactName: 'test',
        emergencyContactRelationship: 'test',
        emergencyContactNumber: 'test',
        bursaryRequested: false,
        attendingScunt: true,
        summerLocationCity: 'test',
        summerLocationCountry: 'test',
        photograph: true,
        froshGroup: 'test',
        isRegistered: true,
        froshGroupIcon: 'test',
        scuntTeam: 0,
      });
    }
    await ScuntTeamServices.initializeTeams();
  });

  it('.deleteTransaction()\t\t|\tDelete a transaction', async () => {
    const scuntTeam = await ScuntTeamModel.create({
      number: 11,
      name: 'Scunt Team 11',
      points: 10,
    });
    await ScuntMissionModel.create({
      number: 200,
      name: 'Test Mission 2',
      category: '',
      points: 10,
      isHidden: false,
      isJudgingStation: false,
    });
    scuntTeam.transactions = [];
    scuntTeam.transactions.push({ _id: 4545345, name: 'Test', points: 5, missionNumber: 2 });
    const testTeam = await ScuntTeamServices.deleteTransaction(11, 4545345);
    assert(testTeam.transactions.length === 0);
  });

  it('.deleteTransaction()\t\t|\tDelete a transaction (INVALID TEAM NUMBER)', async () => {
    await assert.rejects(ScuntTeamServices.deleteTransaction(100000, 429496729), {
      name: 'Error',
      message: 'TEAM_NOT_FOUND',
    });
  });

  it('.viewRecentTransactions()\t\t|\tView recent transactions', async () => {
    await ScuntTeamModel.create({
      number: 16,
      name: 'Scunt Team 16',
      points: 10,
    });
    await ScuntMissionModel.create({
      number: 30,
      name: 'Test Mission 3',
      category: '',
      points: 10,
      isHidden: false,
      isJudgingStation: false,
    });
    await ScuntTeamServices.addTransaction(16, 3, 10);
    transactions = await ScuntTeamServices.viewRecentTransactions();
    assert(transactions.length > 0);
  });

  it('.setTeamName()\t\t\t|\tSet new team name', async () => {
    await ScuntTeamModel.create({
      number: 17,
      name: 'Scunt Team 17',
      points: 20,
    });
    const testTeam = await ScuntTeamServices.setTeamName(17, 'Scunt Team 17');
    assert(testTeam.name === 'Scunt Team 17');
  });

  it('.setTeamName()\t\t\t|\tSet invalid team name (INVALID NUMBER)', async () => {
    await assert.rejects(ScuntTeamServices.setTeamName(100000, 'lalalalalala'), {
      name: 'Error',
      message: 'INVALID_TEAM_NUMBER',
    });
  });
});
