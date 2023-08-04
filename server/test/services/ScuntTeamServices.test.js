/* eslint-disable no-undef */
const ScuntTeamServices = require('../../src/services/ScuntTeamServices');
const LeadurModel = require('../../src/models/LeadurModel');
const ScuntTeamModel = require('../../src/models/ScuntTeamModel');
const assert = require('assert');

describe('Testing Scunt Team Services', () => {
    let testLeadur;
    let teamPoints = [];
    let teams = [];
    let scuntJudges = [];

    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number', async () => {
        const leadur = await LeadurModel.create({
            approved: true,
            froshDataFields: {},
            scuntTeam: 1,
        });
        testLeadur = await ScuntTeamServices.updateLeaderTeam(leadur.id, 2);
        assert(testLeadur.scuntTeam === 2);
    });

    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number (INVALID LEADUR ID)', async () => {
        await assert.rejects(ScuntTeamServices.updateLeaderTeam('1234567890', 3), {
            name: 'Error',
            message: 'INVALID_LEADUR_ID',
        });
    });

    /* not sure about this one */
    it('.updateLeaderTeam()\t\t\t|\tUpdate a leaders scunt team number (UNABLE TO UPDATE LEADUR)', async () => {
        const leadur = await LeadurModel.create({
            scuntTeam: 1,
        });
        await assert.rejects(ScuntTeamServices.updateLeaderTeam(leadur.id, 3), {
            name: 'Error',
            message: 'UNABLE_TO_UPDATE_LEADER',
        });
    });

    it('.getTeamPoints()\t\t\t|\tShould return array with teams and their points', async () => {
        teamPoints = await ScuntTeamServices.getTeamPoints();
        assert(teamPoints.length > 0);
    });
    
    it('.getTeams()\t\t\t|\tShould return array with teams', async () => {
        teams = await ScuntTeamServices.getTeams();
        assert(teams.length > 0);
    });

    it('.bribeTransaction()\t\t\t|\tUpdate a bribe transaction', async () => {
        const leadur = await LeadurModel.create({
            approved: true,
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const { team, testLeader } = await ScuntTeamServices.bribeTransaction(1, 10, leadur);
        assert(testLeader.scuntJudgeBribePoints === 10);
    });

    it('.bribeTransaction()\t\t\t|\tUpdate a bribe transaction (NOT ENOUGH BRIBE POINTS)', async () => {
        const leadur = await LeadurModel.create({
            approved: true,
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        await assert.rejects(ScuntTeamServices.bribeTransaction(1, 30, leadur), {
            name: 'Error',
            message: 'NOT_ENOUGH_BRIBE_POINTS',
        });
    });

    /* couldn't think of other errors for bribeTransaction */

    it('.getScuntJudges()\t\t\t|\tShould return array with scunt judges', async () => {
        scuntJudges = await ScuntTeamServices.getScuntJudges();
        assert(scuntJudges.length > 0);
    });

    /* couldn't think of errors for getScuntJudges */

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
        const leadur = await LeadurModel.create({
            approved: true,
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur.id, 10, true);
        assert(refilledleadur.scuntJudgeBribePoints === 30);
    });

    it('.refillBribePoints()\t\t\t|\tRefill judge bribe points', async () => {
        const leadur = await LeadurModel.create({
            approved: true,
            froshDataFields: {},
            scuntTeam: 1,
            scuntJudgeBribePoints: 20,
        });
        const refilledleadur = await ScuntTeamServices.refillBribePoints(leadur.id, 10, false);
        assert(refilledleadur.scuntJudgeBribePoints === 10);
    });

    it('.refillBribePoints()\t\t\t|\tRefill invalid judge bribe points (INVALID ID)', async () => {
        await assert.rejects(ScuntTeamServices.refillBribePoints('1234567890', 10, true), {
            name: 'Error',
            message: 'INVALID_LEADUR_ID',
        });
    });

    it('.addTransaction()\t\t\t|\tAdd transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 0,
        });
        const testTeamTransaction = await ScuntTeamServices.addTransaction(1, 1, 20);
        assert(testTeamTransaction === 'Added points for mission #1 for team 1');
    });
    // having trouble with prev points, to test if a team has already been judged

    it('.subtractTransaction()\t\t\t|\tSubtract transactions', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.subtractTransaction(1, 20);
        assert(testTeam.points === 0);
    });

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

    // lost for checkTransaction

    it('.initializeTeams()\t\t\t|\tInitialize scunt teams', async () => {
        const teams = await ScuntTeamServices.initializeTeams();
        assert(teams.length > 0);
    });

    // lost for deleteTransaction
    // lost for viewRecentTransactions

    it('.setTeamName()\t\t\t|\tSet new team name', async () => {
        const scuntTeam = await ScuntTeamModel.create({
            number: 1,
            name: "hey",
            points: 20,
        });
        const testTeam = await ScuntTeamServices.setTeamName(1, "hello");
        assert(testTeam.name === "hello");
    });

    it('.setTeamName()\t\t\t|\tSet invalid team name (INVALID NUMBER)', async () => {
        await assert.rejects(ScuntTeamServices.setTeamName(100000, "lalalalalala"), {
            name: 'Error',
            message: 'INVALID_TEAM_NUMBER',
        });
    });
});
