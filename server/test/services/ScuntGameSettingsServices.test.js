/* eslint-disable no-undef */
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const assert = require('assert');

describe('ScuntGameSettingsServices', () => {
  let settings;

  it('.setGameSettings()\t\t\t|\tSet invalid scunt game settings (INVALID SETTING)', async () => {
    await assert.rejects(
      ScuntGameSettingsServices.setGameSettings(
        'Scunt2T3',
        11,
        2500,
        0.3,
        true,
        true,
        true,
        true,
        'url',
        true,
        true,
        true,
      ),
      {
        name: 'Error',
        message: 'UNABLE_TO_UPDATE_SCUNT_SETTINGS',
      },
    );
  });

  it('.initScuntGameSettings()\t\t\t|\tFind settings', async () => {
    settings = await ScuntGameSettingsServices.initScuntGameSettings();
    assert(settings.name === 'Scunt 2T3 Settings');
    assert(settings.amountOfTeams === 10);
  });

  /* couldn't think of test case for getGameSettings for it not to work besides network error */
  it('.getGameSettings()\t\t\t|\tGet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.getGameSettings();
    assert(settings !== null);
    assert.equal(settings.name, 'Scunt 2T3 Settings');
    assert.equal(settings.amountOfStarterBribePoints, 10000);
  });

  it('.setGameSettings()\t\t\t|\tSet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      11,
      2500,
      0.3,
      0.3,
      true,
      true,
      true,
      true,
      true,
      true,
    );
    assert(settings.name === 'Scunt2T3 Settings');
    assert(settings.amountOfTeams === 11);
  });

  it('.setGameSettings()\t\t\t|\tSet multiple scunt game settings', async () => {
    await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      11,
      2500,
      0.3,
      0.3,
      true,
      true,
      true,
      true,
      true,
      true,
    );
    await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      10,
      2500,
      0.3,
      0.3,
      true,
      true,
      true,
      true,
      true,
      true,
    );
    await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      11,
      2500,
      0.3,
      0.3,
      true,
      true,
      false,
      true,
      true,
      true,
    );
    const testSettings = await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      11,
      2400,
      0.3,
      0.3,
      false,
      true,
      false,
      true,
      false,
      true,
    );
    assert(testSettings.amountOfStarterBribePoints === 2400);
    await ScuntGameSettingsServices.setGameSettings(
      'Scunt2T3 Settings',
      10,
      2500,
      0.3,
      0.3,
      true,
      true,
      true,
      true,
      true,
      true,
    );
  });
});
