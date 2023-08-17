const ScuntMissionServices = require('../../src/services/ScuntMissionServices');
const LeadurModel = require('../../src/models/LeadurModel');
const ScuntMissionModel = require('../../src/models/ScuntMissionModel');
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const assert = require('assert');


describe('Testing Scunt Mission Services', () => {
    let scuntMissions;
    let leadur;
    it('create(number, name, category, points, isHidden, isJudgingStation)\t\t\t\t|\tCreating A Scunt Mission', async () => {
        let newMission = await ScuntMissionServices.create(1, 'New Mission 1', "Category 1", 10, true, true);
        assert(newMission.name === 'New Mission 1');
    });

    it('create(number, name, category, points, isHidden, isJudgingStation)\t\t\t\t|\tCreating A Scunt Mission (INVALID MISSION)', async () => {
        await assert.rejects(ScuntMissionServices.create(2, "" ,"Category 1", 10, true, true), {
            name: 'Error',
            message: 'UNABLE_TO_CREATE_MISSION',
        });
    });

    it('create(number, name, category, points, isHidden, isJudgingStation)\t\t\t\t|\tCreating A Scunt Mission (ALREADY EXIST #)', async () => {
        await assert.rejects(ScuntMissionServices.create(1, "New Mission 1" ,"Category 1", 10, true, true), {
            name: 'Error',
            message: 'UNABLE_TO_CREATE_MISSION',
        });
    });

    it('.getAllScuntMissions(showHidden, user)\t\t\t\t\t\t\t\t|\tGetting Scunt Missions (NO SETTINGS)', async () => {
       leadur = await LeadurModel.create({
         lastName: 'aaa',
         firstName: 'aaa',
         approved: true,
         hashedPassword: 'aaa',
         email: 'aaa@a.com',
         authScopes: {
             approved: ['scunt:exec show missions']
         },
         froshDataFields: {},
         });
         await assert.rejects(ScuntMissionServices.getAllScuntMissions(true, leadur), {
            name: 'Error',
            message: 'INVALID_SETTINGS',
        });
     });

     it('.getAllScuntMissions(showHidden, user)\t\t\t\t\t\t\t\t|\tGetting Scunt Missions', async () => {
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
        scuntMissions = await ScuntMissionServices.getAllScuntMissions(true, leadur);

        assert(scuntMissions[0].name === 'New Mission 1');
    });

    it('createMultipleMissions(array)\t\t\t\t\t\t\t\t\t|\tCreating Multiple Scunt Missions (INVALID MISSION)', async () => {
        const incorrectArray = [
            {
                number: 1,
                name: '',
                category: 'Category 1',
                points: 10,
                isHidden: 'true',
                isJudgingStation: 'true',
            }
        ]
        await assert.rejects(ScuntMissionServices.createMultipleMissions(incorrectArray), {
            name: 'Error',
            message: 'UNABLE_TO_CREATE_SCUNT_MISSIONS',
        });
    });

    let array;
    it('createMultipleMissions(array)\t\t\t\t\t\t\t\t\t|\tCreating Multiple Scunt Missions', async () => {
         array = [
            {
                number: 1,
                name: 'New Mission 1',
                category: 'Category 1',
                points: 10,
                isHidden: true,
                isJudgingStation: true,
            },
            {
                 number: 2,
                 name: 'New Mission 2',
                 category: 'Category 2',
                 points: 20,
                 isHidden: true,
                 isJudgingStation: true,
             },
             {
                 number: 3,
                 name: 'New Mission 3',
                 category: 'Category 3',
                 points: 30,
                 isHidden: true,
                 isJudgingStation: true,
             },
            ]
         let scuntMissions = await ScuntMissionServices.createMultipleMissions(array);
         assert(scuntMissions[2].name === 'New Mission 3')
    });



    it('updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation)\t\t|\tUpdating Mission Visibility', async () => {
        let missions = await ScuntMissionServices.updateMissionVisibility(1, 3, false, false);
        assert(missions.modifiedCount === 3);

    });

    it('updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation)\t\t|\tUpdating Mission Visibility (NO MISSIONS FOUND)', async () => {
        let missions = await ScuntMissionServices.updateMissionVisibility(11, 12, true, true)
        assert(missions.modifiedCount === 0);
    });

    it('updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation)\t\t|\tUpdating Mission Visibility (INCORRECT PARAMETER)', async () => {
        await assert.rejects(ScuntMissionServices.updateMissionVisibility(10, 20, 9999, true), {
            name: 'Error',
            message: 'UNABLE_TO_UPDATE_MISSION_VISIBILITY',
        });
    });
    

    it('deleteMission(number)\t\t\t\t\t\t\t\t\t\t|\tDeleting a Scunt Mission', async () => {
        let deletedMission = await ScuntMissionServices.deleteMission(1);
        assert(deletedMission.name === "New Mission 1");
    });

    it('deleteMission(number)\t\t\t\t\t\t\t\t\t\t|\tDeleting a Scunt Mission (INVALID INPUT)', async () => {
        await assert.rejects(ScuntMissionServices.deleteMission("aaa"), {
             name: 'Error',
             message: 'UNABLE_TO_DELETE_MISSION',
        });
    });


    it('getMission(number)\t\t\t\t\t\t\t\t\t\t|\tGetting a Scunt Mission', async () => {
        let mission = await ScuntMissionServices.getMission(2);
        assert(mission.name === "New Mission 2");
    });

    it('getMission(number)\t\t\t\t\t\t\t\t\t\t|\tGetting a Scunt Mission (NONEXISTING MISSION)', async () => {
        await assert.rejects(ScuntMissionServices.getMission(10), {
            name: 'Error',
            message: 'MISSION_DOES_NOT_EXIST',
        });
    });

    //idk if this is work
    it('getMission(number)\t\t\t\t\t\t\t\t\t\t|\tGetting a Scunt Mission (INVALID PARAMETER)', async () => {
        await assert.rejects(ScuntMissionServices.getMission("aaaa"), {
            name: 'Error',
            message: 'UNABLE_TO_GET_MISSION',
        });
    });





});
  