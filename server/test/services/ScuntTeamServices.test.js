/* eslint-disable no-undef */
const ScuntTeamServices = require('../../src/services/ScuntTeamServices');
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const LeadurModel = require('../../src/models/LeadurModel');
const UserModel = require('../../src/models/UserModel');
const ScuntTeamModel = require('../../src/models/ScuntTeamModel');
const ScuntGameSettingsModel = require('../../src/models/ScuntGameSettingsModel');
const assert = require('assert');
const ScuntMissionModel = require('../../src/models/ScuntMissionModel');

describe('Testing Scunt Team Services', () => {
    let testLeadur;
    let team;
    let teamPoints = [];
    let teams = [];
    let scuntJudges = [];
    let tranactions = [];

    it('.viewRecentTransactions()\t\t\t|\tView recent transactions (empty)', async () => {
        transactions = await ScuntTeamServices.viewRecentTransactions();
        assert(transactions.length === 0);
    });

    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number', async () => {
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
            email: 'test2@test.utoronto.ca',
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
            name: 'Scunt 2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 10000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            revealJudgesAndBribes: true,
            revealTeams: true,
            showDiscordLink: true,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            revealLeaderboard: true,
            revealMissions: true,
            allowJudging: true,
        };
    
        const settings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);

        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test3@test.utoronto.ca',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });

        const scuntTeam = await ScuntTeamModel.create({
            number: 8,
            name: "hey",
            points: 20,
        });

        const {testTeam, testLeadur} = await ScuntTeamServices.bribeTransaction(8, 10, leadur);
        assert(testLeadur.firstName === 'Test');
    });
    */
    
    
    it('.bribeTransaction()\t\t\t|\tUpdate a bribe transaction (NOT ENOUGH BRIBE POINTS)', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test4@test.utoronto.ca',
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
    
    it('.getScuntJudges()\t\t\t|\tShould return array with scunt judges', async () => {
        const leadur = await LeadurModel.create({
            lastName: 'Testerson',
            firstName: 'Test',
            approved: true,
            hashedPassword: 'test12345',
            email: 'test14@test.utoronto.ca',
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const judges = await ScuntTeamServices.getScuntJudges();
        assert(judges.length === 0);
    });
    


    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
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

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
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
            email: 'test8@test.utoronto.ca',
            hashedPassword: 'test',
        });
        await assert.rejects(ScuntTeamServices.refillBribePoints(testUser._id, 10, true), {
            name: 'Error',
            message: 'INVALID_LEADUR_ID',
        });
    });

    
    it('.addTransaction()\t\t\t|\tAdd transaction', async () => {
        const scuntGameSettings = {
            name: 'Scunt 2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 10000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            revealJudgesAndBribes: true,
            revealTeams: true,
            showDiscordLink: true,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            revealLeaderboard: true,
            revealMissions: true,
            allowJudging: true,
        };
    
        const settings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 0,
        });
        const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 2, 20);
        assert(testTeamTransaction.name === 'Added 20 points for mission #2 for team 1');
    });

    it('.addTransaction()\t\t\t|\tAdd transaction', async () => {
        const scuntGameSettings = {
            name: 'Scunt 2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 10000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            revealJudgesAndBribes: true,
            revealTeams: true,
            showDiscordLink: true,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            revealLeaderboard: true,
            revealMissions: true,
            allowJudging: true,
        };
    
        const settings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);
        const scuntTeam = await ScuntTeamModel.create({
            number: 9,
            name: "hey",
            points: 20,
        });
        const testTeamTransaction = await ScuntTeamServices.addTransaction(9, 2, 30);
        assert(testTeamTransaction.name === 'Added 30 points for mission #2 for team 9');
    });
    
    // having trouble with prev points with addTransaction

    it('.addTransaction()\t\t\t|\tAdd transaction (INVALID TEAM)', async () => {
        await assert.rejects(ScuntTeamServices.addTransaction(100000, 2, 20), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });
    
    it('.subtractTransaction()\t\t\t|\tSubtract transaction', async () => {
        const scuntGameSettings = {
            name: 'Scunt 2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 10000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            revealJudgesAndBribes: true,
            revealTeams: true,
            showDiscordLink: true,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            revealLeaderboard: true,
            revealMissions: true,
            allowJudging: true,
        };
    
        const settings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);
        const scuntTeam = await ScuntTeamModel.create({
            number: 2,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.subtractTransaction(2, 20);
        assert(testTeam.points === 0);
    });

    it('.subtractTransaction()\t\t\t|\tSubtract transaction', async () => {
        const scuntGameSettings = {
            name: 'Scunt 2T3 Settings',
            amountOfTeams: 10,
            amountOfStarterBribePoints: 10000,
            maxAmountPointsPercent: 0.3,
            minAmountPointsPercent: 0.3,
            revealJudgesAndBribes: true,
            revealTeams: true,
            showDiscordLink: true,
            discordLink: 'https://discord.gg/mRutbwuCK9',
            revealLeaderboard: true,
            revealMissions: true,
            allowJudging: true,
        };
    
        const settings = await ScuntGameSettingsServices.initScuntGameSettings(scuntGameSettings);
        const scuntTeam = await ScuntTeamModel.create({
            number: 10,
            name: "hey",
            points: 10,
        });
        const testTeam = await ScuntTeamServices.subtractTransaction(10, 20);
        assert(testTeam.points === -10);
    });

    it('.subtractTransaction()\t\t\t|\TSubtract transaction (INVALID TEAM)', async () => {
        await assert.rejects(ScuntTeamServices.subtractTransaction(100000, 20), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });

    it('.viewTransactions()\t\t\t|\tView transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 3,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.viewTransactions(3);
        assert(testTeam.number === 3);
        assert(testTeam.name === "hey");
    });

    it('.viewTransactions()\t\t\t|\tView transactions (INVALID TEAM)', async () => {
        await assert.rejects(ScuntTeamServices.viewTransactions(100000), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });

    it('.checkTransaction()\t\t\t|\tCheck a transaction', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 4,
            name: "hey",
            points: 10,
        });
        const mission = await ScuntMissionModel.create({
            number: 1,
            name: 'Test Mission',
            category: '',
            points: 10,
            isHidden: false,
            isJudgingStation: false,
        })
        const points = await ScuntTeamServices.checkTransaction(4, 1);
        assert(points === 0);
    });

    it('.checkTransaction()\t\t\t|\tCheck a transaction (INVALID TEAM NUMBER)', async () => {
        await assert.rejects(ScuntTeamServices.checkTransaction(1000, 10), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });

    /*
    it('.initializeTeams()\t\t\t|\tInitialize scunt teams', async () => {
        const teams = await ScuntTeamServices.initializeTeams();
        assert(teams.length > 0);
    });
*/

    /*
    it('.deleteTransaction()\t\t\t|\tDelete a transaction', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 5,
            name: "Test Team",
            points: 10,
            transactions: [],
        });
        const mission = await ScuntMissionModel.create({
            number: 2,
            name: 'Test Mission 2',
            category: '',
            points: 10,
            isHidden: false,
            isJudgingStation: false,
        })
        const points = await ScuntTeamServices.addTransaction(5, 2, 10);
        const testTeam = await ScuntTeamServices.deleteTransaction(5, scuntTeam.transactions[0]._id);
        assert(testTeam.transactions.length === 1);
    });
    */

    it('.deleteTransaction()\t\t\t|\tDelete a transaction (does not find ID)', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 5,
            name: "Test Team",
            points: 10,
            transactions: [],
        });
        const mission = await ScuntMissionModel.create({
            number: 2,
            name: 'Test Mission 2',
            category: '',
            points: 10,
            isHidden: false,
            isJudgingStation: false,
        })
        const points = await ScuntTeamServices.addTransaction(5, 2, 10);
        const testTeam = await ScuntTeamServices.deleteTransaction(5, scuntTeam.transactions._id);
        assert(testTeam.transactions.length === 1);
    });

    it('.deleteTransaction()\t\t\t|\tDelete a transaction (INVALID TEAM NUMBER)', async () => {
        await assert.rejects(ScuntTeamServices.deleteTransaction(100000, 429496729), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });

    it('.viewRecentTransactions()\t\t\t|\tView recent transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 6,
            name: "hey",
            points: 10,
        });
        const mission = await ScuntMissionModel.create({
            number: 3,
            name: 'Test Mission 3',
            category: '',
            points: 10,
            isHidden: false,
            isJudgingStation: false,
        })
        const points = await ScuntTeamServices.addTransaction(6, 3, 10);
        transactions = await ScuntTeamServices.viewRecentTransactions();
        assert(transactions.length > 0);
    });

    it('.setTeamName()\t\t\t|\tSet new team name', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 7,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.setTeamName(7, "hello");
        assert(testTeam.name === "hello");
    });

    it('.setTeamName()\t\t\t|\tSet invalid team name (INVALID NUMBER)', async () => {
        await assert.rejects(ScuntTeamServices.setTeamName(100000, "lalalalalala"), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });
});
