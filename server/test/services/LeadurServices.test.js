/* eslint-disable no-undef */
const LeadurServices = require('../../src/services/LeadurServices');
assert = require('assert');

describe('LeadurServices', () => {
  let testLeadur;
  it('.createLeadur(...)\t|\tCreating a new Leadur', async () => {
    testLeadur = await LeadurServices.createLeadur(
      'leadur@services.com',
      'Password!2',
      'Leadur',
      'Services',
      'Leadur',
      -1,
    );
  });

  it('.createLeadur(...)\t|\tCreating a new Leadur (UNABLE_TO_HASH_PASSWORD)', async () => {
    await assert.rejects(
      LeadurServices.createLeadur(
        'leadur@services.com',
        undefined,
        'Leadur',
        'Services',
        'Leadur',
        -1,
      ),
      {
        name: 'Error',
        message: 'UNABLE_TO_HASH_PASSWORD',
      },
    );
  });

  it('.createLeadur(...)\t|\tCreating a new Leadur (UNABLE_TO_CREATE_LEEDUR)', async () => {
    await assert.rejects(
      LeadurServices.createLeadur(
        'leadur@services.com',
        'Password!2',
        'Leadur',
        'Services',
        'Leadur',
        -1,
      ),
      {
        name: 'Error',
        message: 'UNABLE_TO_CREATE_LEEDUR',
      },
    );
  });

  it('.requestScopesAndData(...)|\tUpdating leedur permissions', async () => {
    const updatedLeadur = await LeadurServices.requestScopesAndData(
      testLeadur._id,
      ['firstName', 'lastName', 'pronouns'],
      ['read:users', 'read:groups'],
    );
    assert(updatedLeadur.froshDataFields.requested.length === 3);
    assert(updatedLeadur.authScopes.requested.length === 2);
  });

  it('.createLeadur(...)\t|\tCreating a new Leadur (USER_NOT_FOUND)', async () => {
    await assert.rejects(
      LeadurServices.requestScopesAndData(
        '64e6b8d0c4d8ade85b814c44',
        ['firstName', 'lastName', 'pronouns'],
        ['read:users', 'read:groups'],
      ),
      {
        name: 'Error',
        message: 'USER_NOT_FOUND',
      },
    );
  });

  it('.createLeadur(...)\t|\tCreating a new Leadur (UNABLE_TO_UPDATE_LEEDUR)', async () => {
    await assert.rejects(
      LeadurServices.requestScopesAndData(
        '   ',
        ['firstName', 'lastName', 'pronouns'],
        ['read:users', 'read:groups'],
      ),
      {
        name: 'Error',
        message: 'UNABLE_TO_UPDATE_LEEDUR',
      },
    );
  });
});
