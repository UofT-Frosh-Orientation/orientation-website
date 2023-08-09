/* eslint-disable no-undef */
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const assert = require('assert');

describe('Testing Scunt Game Settings Services', () => {
  let settings;

  it('.setGameSettings()\t\t\t|\tSet invalid scunt game settings (INVALID SETTING)', async () => {
    await assert.rejects(
        ScuntGameSettingsServices.setGameSettings('Scunt2T3', 11, 2500, 0.3, true, true, true, true, 'url', true, true, true), {
        name: 'Error',
        message: 'UNABLE_TO_UPDATE_SCUNT_SETTINGS',
    }, );
  }); 

  /*
  it('.initScuntGameSettings()\t\t\t|\tFind an invalid scunt game setting (INVALID SETTING)', async () => {
    const incorrectSetting = {
        name: 'New Test Setting 12345',
        amountOfTeams: 101,
        amountOfStarterBribePoints: 2500,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
    };
    await assert.rejects(ScuntGameSettingsServices.initScuntGameSettings(incorrectSetting), {
      name: 'Error',
      message: 'UNABLE_TO_GET_SCUNT_SETTINGS',
    });
  });
  */
  
  it('.initScuntGameSettings()\t\t\t|\tFind settings', async () => {
    const initialSettings = {
        name: 'Scunt2T3 Settings',
        amountOfTeams: 10,
        amountOfStarterBribePoints: 2500,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
        revealJudgesAndBribes: true,
        revealTeams: true,
        showDiscordLink: true,
        revealLeaderboard: true,
        revealMissions: true,
        allowJudging: true,
    };
    settings = await ScuntGameSettingsServices.initScuntGameSettings(initialSettings);
    assert(settings.name === 'Scunt2T3 Settings');
    assert(settings.amountOfTeams === 10);
  });

  it('.initScuntGameSettings()\t\t\t|\tNew setting should not overwrite original Scunt setting', async () => {
    const newSetting = {
        name: 'New Test Setting 123456',
        amountOfTeams: 101,
        amountOfStarterBribePoints: 2500,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
        revealJudgesAndBribes: true,
        revealTeams: true,
        showDiscordLink: false,
        revealLeaderboard: true,
        revealMissions: false,
        allowJudging: false,
    };
    
    const testSettings = await ScuntGameSettingsServices.initScuntGameSettings(newSetting);
    assert(testSettings.name === 'Scunt2T3 Settings');
  });

  it('.initScuntGameSettings()\t\t\t|\tFind existing/create new scunt game settings consecutively', async () => {
    const newSetting = {
        name: 'New Test Setting 12345',
        amountOfTeams: 101,
        amountOfStarterBribePoints: 2500,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
        revealJudgesAndBribes: true,
        revealTeams: true,
        showDiscordLink: false,
        revealLeaderboard: true,
        revealMissions: false,
        allowJudging: false,
    };
    const initialSettings = {
        name: 'Scunt2T3 Settings',
        amountOfTeams: 10,
        amountOfStarterBribePoints: 2500,
        maxAmountPointsPercent: 0.3,
        minAmountPointsPercent: 0.3,
        revealJudgesAndBribes: true,
        revealTeams: true,
        showDiscordLink: true,
        revealLeaderboard: true,
        revealMissions: true,
        allowJudging: true,
    };
    await ScuntGameSettingsServices.initScuntGameSettings(newSetting);
    await ScuntGameSettingsServices.initScuntGameSettings(newSetting);
    await ScuntGameSettingsServices.initScuntGameSettings(newSetting);
    await ScuntGameSettingsServices.initScuntGameSettings(initialSettings);
    await ScuntGameSettingsServices.initScuntGameSettings(initialSettings);
    await ScuntGameSettingsServices.initScuntGameSettings(initialSettings);
  });

  /* couldn't think of test case for getGameSettings for it not to work besides network error */
  it('.getGameSettings()\t\t\t|\tGet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.getGameSettings();
    assert(settings !== null);
  });

  it('.setGameSettings()\t\t\t|\tSet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.setGameSettings(
        'Scunt2T3 Settings', 11, 2500, 0.3, 0.3, true, true, true, true, true, true );
    assert(settings.name === 'Scunt2T3 Settings');
    assert(settings.amountOfTeams === 11);
  });

  it('.setGameSettings()\t\t\t|\tSet multiple scunt game settings', async () => {
    await ScuntGameSettingsServices.setGameSettings('Scunt2T3 Settings', 11, 2500, 0.3, 0.3, true, true, true, true, true, true);
    await ScuntGameSettingsServices.setGameSettings('Scunt2T3 Settings', 10, 2500, 0.3, 0.3, true, true, true, true, true, true);
    await ScuntGameSettingsServices.setGameSettings('Scunt2T3 Settings', 11, 2500, 0.3, 0.3, true, true, false, true, false, true);
    await ScuntGameSettingsServices.setGameSettings('Scunt2T3 Settings', 11, 2500, 0.3, 0.3, false, true, false, true, false, true);
    await ScuntGameSettingsServices.setGameSettings('Scunt2T3 Settings', 10, 2500, 0.3, 0.3, true, true, true, true, true, true);
  });

  
  
});