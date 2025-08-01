/* eslint-disable no-undef */
const ScuntGameSettingsServices = require('../../src/services/ScuntGameSettingsServices');
const assert = require('assert');

describe('ScuntGameSettingsServices', () => {
  let settings;

  it('.setGameSettings()\t\t\t|\tSet invalid scunt game settings (SETTINGS_NOT_FOUND)', async () => {
    await assert.rejects(
      ScuntGameSettingsServices.setGameSettings(
        'SkuleHunt2T4',
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
        message: 'SETTINGS_NOT_FOUND',
      },
    );
  });

  it('.initScuntGameSettings()\t\t\t|\tFind settings', async () => {
    settings = await ScuntGameSettingsServices.initScuntGameSettings();
    assert(settings.name === 'Skule™ Hunt 2T5 Settings');
    assert(settings.amountOfTeams === 10);
  });

  /* couldn't think of test case for getGameSettings for it not to work besides network error */
  it('.getGameSettings()\t\t\t|\tGet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.getGameSettings();
    assert(settings !== null);
    assert.equal(settings.name, 'Skule™ Hunt 2T5 Settings');
    assert.equal(settings.amountOfStarterBribePoints, 10000);
  });

  it('.setGameSettings()\t\t\t|\tSet scunt game settings', async () => {
    settings = await ScuntGameSettingsServices.setGameSettings(
      'Skule™ Hunt 2T5 Settings',
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
    assert(settings.name === 'Skule™ Hunt 2T5 Settings');
    assert(settings.amountOfTeams === 11);
  });

  it('.setGameSettings()\t\t\t|\tSet multiple scunt game settings', async () => {
    await ScuntGameSettingsServices.setGameSettings(
      'Skule™ Hunt 2T5 Settings',
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
      'Skule™ Hunt 2T5 Settings',
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
      'Skule™ Hunt 2T5 Settings',
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
      'Skule™ Hunt 2T5 Settings',
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
      'Skule™ Hunt 2T5 Settings',
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
