/* eslint-disable no-undef */
const UserServices = require('../../src/services/UserServices');
const UserModel = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const LeadurModel = require('../../src/models/LeadurModel');

describe('UserServices', () => {
  process.env.JWT_RESET_TOKEN = 123;
  process.env.JWT_EMAIL_CONFIRMATION_TOKEN = 123;

  let testUser1;
  let testUser2;

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
    testUser1 = await UserModel.create({
      email: 'test@test.com',
      hashedPassword: '$2b$1',
      firstName: 'Test',
      lastName: 'User',
    });
    await assert.rejects(UserServices.validateUser('test@test.com', 'Password!2'), {
      name: 'Error',
      message: 'DUPLICATE_EMAIL',
    });
  });

  it('.create(email, password, firstName, lastName, preferredName)', async () => {
    testUser2 = await UserServices.create('test@create.com', 'Password!23', 'Test', 'User', 'Test');

    assert.equal(testUser2.email, 'test@create.com');
    assert.equal(testUser2.firstName, 'Test');
    assert.equal(testUser2.lastName, 'User');
    assert.equal(testUser2.preferredName, 'Test');
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

  let passwordResetToken;
  it('.generatePasswordResetToken(email)', async () => {
    passwordResetToken = await UserServices.generatePasswordResetToken('test@test.com');
    assert(passwordResetToken);
  });

  it('.generatePasswordResetToken(email) Wrong email', async () => {
    await assert.rejects(UserServices.generatePasswordResetToken('test@noemail.com'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.generatePasswordResetToken(email) Invalid email', async () => {
    await assert.rejects(UserServices.generatePasswordResetToken(), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.generatePasswordResetToken(email) bad environment', async () => {
    const env = process.env;
    delete env.JWT_RESET_TOKEN;
    await assert.rejects(UserServices.generatePasswordResetToken('test@test.com'), {
      name: 'Error',
      message: 'UNABLE_TO_GENERATE_PASSWORD_RESET_TOKEN',
    });
  });

  it('.validatePasswordResetToken(token)', async () => {
    process.env.JWT_RESET_TOKEN = 123;
    const result = await UserServices.validatePasswordResetToken(passwordResetToken);
    assert.equal(result.userEmail, 'test@test.com');
  });

  it('.validatePasswordResetToken(token) invalid token', async () => {
    await assert.rejects(UserServices.validatePasswordResetToken('passwordResetToken'), {
      name: 'Error',
      message: 'UNABLE_TO_VALIDATE_PASSWORD_RESET_TOKEN',
    });
  });

  it('.checkScuntToken(existingUser) user with scunt token', async () => {
    const result = await UserServices.checkScuntToken(testUser2);
    assert.equal(result, true);
  });

  it('.checkScuntToken(existingUser) no scunt token', async () => {
    const result = await UserServices.checkScuntToken({ name: 'test' });
    assert.equal(result, false);
  });

  it('.addScuntToken(userId) add scunt token', async () => {
    const user = await UserServices.addScuntToken(testUser1._id);
    assert(user.scuntToken);
  });

  it('.addScuntToken(userId) bad ID', async () => {
    await assert.rejects(UserServices.addScuntToken('354b434b54b5'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.validateEmailConfirmationToken(token)', async () => {
    const token = jwt.sign('test@test.com', process.env.JWT_EMAIL_CONFIRMATION_TOKEN);

    const result = await UserServices.validateEmailConfirmationToken(token);

    assert.equal(result, 'test@test.com');
  });

  it('.validateEmailConfirmationToken(token) invalid token', async () => {
    await assert.rejects(UserServices.validateEmailConfirmationToken('passwordResetToken'), {
      name: 'Error',
      message: 'UNABLE_TO_VALIDATE_EMAIL_CONFIRMATION_TOKEN',
    });
  });

  it('.getUserByEmail(email) get a user from email', async () => {
    const result = await UserServices.getUserByEmail('test@test.com');
    assert.equal(result.email, 'test@test.com');
  });

  it('.getUserByEmail(email) invalid email', async () => {
    await assert.rejects(UserServices.getUserByEmail('no@email.com'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.getUserByID(userID) get a user from email', async () => {
    const result = await UserServices.getUserByID(testUser2._id);
    assert.equal(result.email, 'test@create.com');
  });

  it('.getUserByID(userID) invalid id', async () => {
    await assert.rejects(UserServices.getUserByID('noid'), {
      name: 'Error',
      message: 'UNABLE_TO_GET_USER',
    });
  });

  it('.getUserByID(userID) no user', async () => {
    await assert.rejects(UserServices.getUserByID('23435b5456b6'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.getAllUsers() Gets all users', async () => {
    await UserModel.collection.drop();
    await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test1',
      hashedPassword: 'test',
    });
    await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test2',
      hashedPassword: 'test',
    });
    const result = await UserServices.getAllUsers();
    assert.equal(result.length, 2);
  });

  it('.getAllUsers() no users', async () => {
    await UserModel.collection.drop();
    await assert.rejects(UserServices.getAllUsers(), {
      name: 'Error',
      message: 'USERS_NOT_FOUND',
    });
  });

  it('.updatePassword(email, password)', async () => {
    await UserModel.create({
      email: 'test@test.com',
      hashedPassword: '$2b$1',
      firstName: 'Test',
      lastName: 'User',
    });
    testUser1 = await UserServices.updatePassword('test@test.com', 'Password!23');
    assert(testUser1.hashedPassword);
    assert.notEqual(testUser1.hashedPassword, '$2b$1');
  });

  it('.updatePassword(email, password) invalid email', async () => {
    await assert.rejects(UserServices.updatePassword('no@email.com', 'Password!2'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.updatePassword(email, password) invalid password', async () => {
    await assert.rejects(UserServices.updatePassword('no@email.com', 'Password'), {
      name: 'Error',
      message: 'INVALID_PASSWORD',
    });
  });

  it('.getUsersAuthScopes() no leedurs', async () => {
    await assert.rejects(UserServices.getUsersAuthScopes(), {
      name: 'Error',
      message: 'USERS_NOT_FOUND',
    });
  });

  it('.requestAuthScopes(user, scopes)', async () => {
    const result = await UserServices.requestAuthScopes(testUser1.id, ['test']);
    assert.equal(result.authScopes.requested[0], 'test');
  });

  it('.requestAuthScopes(user, scopes) no user', async () => {
    await assert.rejects(UserServices.requestAuthScopes('23435b5456b6', ['test']), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.requestAuthScopes(user, scopes) invalid id', async () => {
    await assert.rejects(UserServices.requestAuthScopes('', ['test']), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_AUTH_SCOPES_FOR_USER',
    });
  });

  it('.unsubscribeUser(email)', async () => {
    const result = await UserServices.unsubscribeUser(testUser1.email);
    assert.equal(result.canEmail, false);
  });

  it('.unsubscribeUser(email) no user', async () => {
    await assert.rejects(UserServices.unsubscribeUser('   '), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.resubscribeUser(email)', async () => {
    const result = await UserServices.resubscribeUser(testUser1.email);
    assert.equal(result.canEmail, true);
  });

  it('.resubscribeUser(email) no user', async () => {
    await assert.rejects(UserServices.resubscribeUser('   '), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.getUnapprovedUsers() no leedurs', async () => {
    await assert.rejects(UserServices.getUnapprovedUsers(), {
      name: 'Error',
      message: 'USERS_NOT_FOUND',
    });
  });

  it('.getUnapprovedUsers()', async () => {
    testUser1 = await LeadurModel.create({
      email: 'test@test.com',
      hashedPassword: '$2b$1',
      firstName: 'Test',
      lastName: 'User',
      approved: false,
    });
    const result = await UserServices.getUnapprovedUsers();
    assert.equal(result.length, 1);
  });

  it('.getUsersAuthScopes()', async () => {
    const result = await UserServices.getUsersAuthScopes();
    assert.equal(result.length, 1);
  });

  it('.approveAccountsByIds(accountIds)', async () => {
    testUser1 = await LeadurModel.create({
      email: 'test@test123.com',
      hashedPassword: '$2b$1',
      firstName: 'Test',
      lastName: 'User',
      approved: false,
    });
    const result = await UserServices.approveAccountsByIds([testUser1.id]);
    assert.equal(result.matchedCount, 1);
  });

  it('.approveAccountsByIds(accountIds) invalid ids', async () => {
    await assert.rejects(UserServices.approveAccountsByIds([testUser1.id, '23435b5456b6']), {
      name: 'Error',
      message: 'USERS_NOT_FOUND',
    });
  });

  it('.updateAuthScopes(userAuthScopes)', async () => {
    const result = await UserServices.updateAuthScopes([
      {
        id: testUser1.id,
        auth: [
          {
            approve: true,
            isFroshData: true,
            authreq: 'test',
          },
          {
            approve: true,
            isFroshData: false,
            authreq: 'test',
          },
          {
            approve: false,
            isFroshData: true,
            authreq: 'test1',
          },
          {
            approve: false,
            isFroshData: false,
            authreq: 'test2',
          },
        ],
      },
    ]);
    assert.equal(result.modifiedCount, 1);
  });

  it('.updateAuthScopes(userAuthScopes) invalid id', async () => {
    await assert.rejects(
      UserServices.updateAuthScopes([
        {
          id: testUser1.id,
          auth: [
            {
              approve: true,
              isFroshData: true,
              authreq: 'test',
            },
            {
              approve: true,
              isFroshData: false,
              authreq: 'test',
            },
            {
              approve: false,
              isFroshData: true,
              authreq: 'test1',
            },
            {
              approve: false,
              isFroshData: false,
              authreq: 'test2',
            },
          ],
        },
      ]),
      {
        name: 'Error',
        message: 'USERS_NOT_FOUND',
      },
    );
  });

  it('.getScuntJudgeUsers() no users', async () => {
    await assert.rejects(UserServices.getScuntJudgeUsers(), {
      name: 'Error',
      message: 'USERS_NOT_FOUND',
    });
  });

  it('.getScuntJudgeUsers()', async () => {
    await LeadurModel.create({
      email: 'test@test123.com',
      hashedPassword: '$2b$1',
      firstName: 'Test',
      lastName: 'User',
      authScopes: {
        approved: ['scunt:judge bribe points'],
      },
    });
    const result = await UserServices.getScuntJudgeUsers();
    assert.equal(result.length, 1);
  });

  it('.updateUserInfo(userId, updateInfo)', async () => {
    const user = await UserServices.updateUserInfo(testUser1.id, {
      firstName: 'Test1',
      lastName: 'User1',
      email: 'update@user.com',
    });
    assert.equal(user.firstName, 'Test1');
    assert.equal(user.lastName, 'User1');
    assert.equal(user.email, 'update@user.com');
  });

  it('.updateUserInfo(userId, updateInfo) no user', async () => {
    await assert.rejects(UserServices.updateUserInfo('23435b5456b6', { firstName: 'update' }), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.updateUserInfo(userId, updateInfo) invalid id', async () => {
    await assert.rejects(UserServices.updateUserInfo('', { firstName: 'update' }), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_USER',
    });
  });

  it('.deleteUser(id)', async () => {
    const result = await UserServices.deleteUser(testUser1.id);
    assert.equal(result.id, testUser1.id);
  });

  it('.deleteUser(id) no user', async () => {
    await assert.rejects(UserServices.deleteUser('23435b5456b6'), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.deleteUser(id) invalid id', async () => {
    await assert.rejects(UserServices.deleteUser(''), {
      name: 'Error',
      message: 'UNABLE_TO_DELETE_USER',
    });
  });
});
