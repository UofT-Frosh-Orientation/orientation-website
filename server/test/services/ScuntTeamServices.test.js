/* eslint-disable no-undef */
const ScuntTeamServices = require('../../src/services/ScuntTeamServices');
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const LeadurModel = require('../../src/models/LeadurModel');
const UserModel = require('../../src/models/UserModel');
const ScuntTeamModel = require('../../src/models/ScuntTeamModel');
const ScuntGameSettingsModel = require('../../src/models/ScuntGameSettingsModel');
const assert = require('assert');

describe('Testing Scunt Team Services', () => {
    let testLeadur;
    let team;
    let teamPoints = [];
    let teams = [];
    let scuntJudges = [];

    /*
    const scuntGameSettings = {
        name: 'Scunt2T3 Settings',
        amountOfTeams: 10,
        amountOfStarterBribePoints: 1000,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
        discordLink: 'https://discord.gg/mRutbwuCK9',
        allowJudging: true,
    };

    ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);
    */

    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testing',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test01@test.com',
            froshDataFields: {},
            scuntTeam: 1,
        });
        testLeadur = await ScuntTeamServices.updateLeaderTeam(leadur._id, 2);
        assert(testLeadur.scuntTeam === 2);
    });

    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number with wrong ID (UNABLE TO UPDATE LEADER)', async () => {
        await assert.rejects(ScuntTeamServices.updateLeaderTeam('1234567890', 3), {
            name: 'Error',
            message: 'UNABLE_TO_UPDATE_LEADER',
        });
    });

    
    it('.updateLeaderTeam()\t\t\t|\tUpdate a non-leaders scunt team number (INVALID LEADUR ID)', async () => {
        testUser = await UserModel.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test2@test.com',
            hashedPassword: 'test',
        });
        await assert.rejects(ScuntTeamServices.updateLeaderTeam(testUser._id, 3), {
            name: 'Error',
            message: 'INVALID_LEADUR_ID',
        });
    });

    it('.getTeamPoints()\t\t\t|\tShould return array with teams and their points', async () => {
        const testTeam = await ScuntTeamModel.create({
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
    
    /*
    it('.bribeTransaction()\t\t\t|\tUpdate a bribe transaction', async () => {
        const scuntGameSettings = {
            name: 'Scunt2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 1000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            allowJudging: true,
        };

        const testSettings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);

        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test3@test.com',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const { testTeam, testLeadur } = await ScuntTeamServices.bribeTransaction(1, 10, leadur);
        assert(testLeadur.scuntJudgeBribePoints === 10);
    });
    */
    
    it('.bribeTransaction()\t\t\t|\tUpdate a bribe transaction (NOT ENOUGH BRIBE POINTS)', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test4@test.com',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        await assert.rejects(ScuntTeamServices.bribeTransaction(1, 30, leadur), {
            name: 'Error',
            message: 'NOT_ENOUGH_BRIBE_POINTS',
        });
    });

    // couldn't think of other errors for bribeTransaction
    
    /*
    it('.getScuntJudges()\t\t\t|\tShould return array with scunt judges', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test5@test.com',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        scuntJudges = await ScuntTeamServices.getScuntJudges();
        assert(scuntJudges.length > 0);
    });
    
    // couldn't think of errors for getScuntJudges
    */

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test6@test.com',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur._id, 10, true);
        assert(refilledleadur.scuntJudgeBribePoints === 30);
    });

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test7@test.com',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur._id, 10, false);
        assert(refilledleadur.scuntJudgeBribePoints === 10);
    });

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points with wrong ID (UNABLE TO UPDATE LEADUR)', async () => {
        await assert.rejects(ScuntTeamServices.refillBribePoints('1234567890', 10, true), {
            name: 'Error',
            message: 'UNABLE_TO_UPDATE_LEADUR',
        });
    });

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points with wrong ID (INVALID LEADUR ID)', async () => {
        testUser = await UserModel.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test8@test.com',
            hashedPassword: 'test',
        });
        await assert.rejects(ScuntTeamServices.refillBribePoints(testUser._id, 10, true), {
            name: 'Error',
            message: 'INVALID_LEADUR_ID',
        });
    });

    /*
    it('.addTransaction()\t\t\t|\tAdd transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 0,
        });
        const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 1, 20);
        assert(testTeamTransaction === 'Added points for mission #1 for team 1');
    });
    
    // having trouble with prev points, to test if a team has already been judged with addTransaction
    
    it('.subtractTransaction()\t\t\t|\tSubtract transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.subtractTransaction(1, 20);
        assert(testTeam.points === 0);
    });
    */

    it('.viewTransactions()\t\t\t|\tView transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.viewTransactions(1);
        assert(testTeam.number === 1);
        assert(testTeam.name === "hey");
    });

    it('.viewTransactions()\t\t\t|\tView transactions (INVALID TEAM)', async () => {
        await assert.rejects(ScuntTeamServices.viewTransactions(100000), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });

    /*
    // lost for checkTransaction
    
    it('.initializeTeams()\t\t\t|\tInitialize scunt teams', async () => {
        const teams = await ScuntTeamServices.initializeTeams();
        assert(teams.length > 0);
    });

    // lost for deleteTransaction
    // lost for viewRecentTransactions
    */

    it('.setTeamName()\t\t\t|\tSet new team name', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 4,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.setTeamName(4, "hello");
        assert(testTeam.name === "hello");
    });

    it('.setTeamName()\t\t\t|\tSet invalid team name (INVALID NUMBER)', async () => {
        await assert.rejects(ScuntTeamServices.setTeamName(100000, "lalalalalala"), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });
});
