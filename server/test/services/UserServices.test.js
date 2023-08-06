/* eslint-disable no-undef */
const UserServices = require('../../src/services/UserServices');
const UserModel = require('../../src/models/UserModel');
const assert = require('assert');

describe('Testing User Services', () => {
  UserModel.create({
    email: 'test@test.com',
    hashedPassword: '$2b$1',
    firstName: 'Test',
    lastName: 'User',
    scuntToken: '1234567890',
  });

  it('.validateUser(email, password)', async () => {
    await UserServices.validateUser('test@validate.com', 'Password!23');
  });

  it('.validateUser(email, password) Invalid password', async () => {
    await assert.rejects(UserServices.validateUser('test@validateInvalid.com', 'Password!'), {
      name: 'Error',
      message: 'INVALID_PASSWORD',
    });
  });

  it('.validateUser(email, password) Invalid emails', async () => {
    await assert.rejects(UserServices.validateUser('fdsdsfs', 'Password!'), {
      name: 'Error',
      message: 'INVALID_EMAIL',
    });
  });

  it('.validateUser(email, password) Duplicate emails', async () => {
    await assert.rejects(UserServices.validateUser('test@test.com', 'Password!'), {
      name: 'Error',
      message: 'DUPLICATE_EMAIL',
    });
  });

  it('.create(email, password, firstName, lastName, preferredName)', async () => {
    const user = await UserServices.create(
      'test@create.com',
      'Password!23',
      'Test',
      'User',
      'Test',
    );

    assert.equal(user.email, 'test@create.com');
    assert.equal(user.firstName, 'Test');
    assert.equal(user.lastName, 'User');
    assert.equal(user.preferredName, 'Test');
  });

  it('.create(...) Invalid password', async () => {
    await assert.rejects(UserServices.create('test@create1.com', null, 'Test', 'User', 'Test'), {
      name: 'Error',
      message: 'UNABLE_TO_HASH_PASSWORD',
    });
  });

  it('.create(...) Invalid name', async () => {
    await assert.rejects(
      UserServices.create('test@create2.com', 'Password!23', '', 'User', 'Test'),
      {
        name: 'Error',
        message: 'UNABLE_TO_CREATE_USER',
      },
    );
  });

  it('.generatePasswordResetToken(email)', async () => {
    await UserServices.generatePasswordResetToken('test@test.com');
  });

  it('.generatePasswordResetToken(email) Wrong email', async () => {
    await assert.rejects(UserServices.generatePasswordResetToken('test@noemail.com'), {
      name: 'Error',
      message: 'INVALID_EMAIL',
    });
  });

  it('.generatePasswordResetToken(email) Invalid email', async () => {
    await assert.rejects(UserServices.generatePasswordResetToken(), {
      name: 'Error',
      message: 'INVALID_EMAIL',
    });
  });
});
