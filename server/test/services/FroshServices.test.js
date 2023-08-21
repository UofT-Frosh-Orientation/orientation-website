/* eslint-disable no-undef */
const FroshServices = require('../../src/services/FroshServices');
const UserModel = require('../../src/models/UserModel');
const FroshGroupModel = require('../../src/models/FroshGroupModel');
const assert = require('assert');

describe('FroshServices', () => {
  it('.getNewFroshGroup(discipline, pronouns, froshGroupList)\t|\tGetting a new Frosh Group (PREMADE LIST)', async () => {
    const discipline = 'Electrical & Computer';
    const pronouns = 'she/her';
    const alphaGroup = await FroshGroupModel.create({ name: 'alpha', icon: 'α' });
    const betaGroup = await FroshGroupModel.create({ name: 'beta', icon: 'β' });
    const froshGroupList = [alphaGroup, betaGroup];
    const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
      discipline,
      pronouns,
      froshGroupList,
    );
    assert(froshGroup === 'alpha' && froshGroupIcon === 'α');
  });

  it('.getNewFroshGroup(discipline, pronouns, froshGroupList)\t|\tGetting a new Frosh Group (PREMADE LIST)', async () => {
    const discipline = 'Electrical & Computer';
    const pronouns = 'she/her';
    const [group1] = await FroshGroupModel.find({});

    group1['Electrical & Computer'] = 100;
    await group1.save();
    await FroshServices.getNewFroshGroup(discipline, pronouns);

    group1['Electrical & Computer'] = 0;
    await group1.save();
  });

  it('.getNewFroshGroup(discipline, pronouns, froshGroupList)\t|\tGetting a new Frosh Group (Using .find() FroshGroupModel)', async () => {
    const discipline = 'Electrical & Computer';
    const pronouns = 'she/her';
    const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
      discipline,
      pronouns,
    );
    assert(froshGroup === 'alpha' && froshGroupIcon === 'α');
  });

  it('.initFroshGroups(groups)\t\t\t\t\t|\tInitializing Frosh Groups', async () => {
    const groups = [
      {
        name: 'alpha',
        icon: 'α',
      },
      {
        name: 'beta',
        icon: 'α',
      },
      {
        name: 'gamma',
        icon: 'γ',
      },
      {
        name: 'delta',
        icon: 'δ',
      },
      {
        name: 'epsilon',
        icon: 'ε',
      },
    ];
    const froshGroupList = await FroshServices.initFroshGroups(groups);
    assert(froshGroupList[1].name === 'beta');
  });

  let frosh;
  let paymentIntent;
  it('.upgradeToFrosh(user, newInfo, paymentIntent)\t\t|\tUpgrading User to Frosh', async () => {
    paymentIntent = 'succeeded';
    const user = await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'froshtest@test.com',
      hashedPassword: 'test',
    });
    const user2 = await UserModel.create({
      firstName: 'Test2',
      lastName: 'User2',
      email: 'froshtest2@test.com',
      hashedPassword: 'test2',
    });
    await UserModel.create({
      firstName: 'Test3',
      lastName: 'User3',
      email: 'froshtest3@test.com',
      hashedPassword: 'test3',
    });
    const newInfo = {
      legalName: 'test',
      pronouns: 'she/her',
      birthDate: '01-01-1900',
      utorid: 'test',
      discipline: 'Electrical & Computer',
      shirtSize: 'M',
      phoneNumber: '000-000-0000',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: '000-000-0000',
      attendingScunt: true,
      summerLocationCity: 'Toronto',
      summerLocationCountry: 'Canada',
      photograph: true,
      froshGroup: 'alpha',
      froshGroupIcon: 'α',
    };
    frosh = await FroshServices.upgradeToFrosh(user, newInfo, paymentIntent);
    await FroshServices.upgradeToFrosh(user2, newInfo, paymentIntent);
    assert(frosh.froshGroup === 'alpha');
  });

  it('.addRetreatPayment(user, paymentIntent)\t\t\t|\tAdding Retreat Payment to Frosh (INVALID USER)', async () => {
    const fakeUser = { id: '999999' };
    await assert.rejects(FroshServices.addRetreatPayment(fakeUser, paymentIntent), {
      name: 'Error',
      message: 'UNABLE_TO_ADD_PAYMENT',
    });
  });

  it('.addRetreatPayment(user, paymentIntent)\t\t\t|\tAdding Retreat Payment to Frosh', async () => {
    const returnedFrosh = await FroshServices.addRetreatPayment(frosh, paymentIntent);
    assert(returnedFrosh.froshGroup === frosh.froshGroup);
  });

  it('.getFroshInfo(id)\t\t\t\t\t\t|\tGetting Frosh', async () => {
    const returnedFrosh = await FroshServices.getFroshInfo(frosh.id);
    assert(returnedFrosh.froshGroup === frosh.froshGroup);
  });

  it('.getFroshInfo(id)\t\t\t\t\t\t|\tGetting Frosh (INVALID USER ID)', async () => {
    await assert.rejects(FroshServices.getFroshInfo('999999'), {
      name: 'Error',
      message: 'UNABLE_TO_GET_FROSH',
    });
  });

  let updateInfo;
  it('.updateFroshInfo(userId, updateInfo)\t\t\t|\tUpdating Frosh Information', async () => {
    updateInfo = {
      firstName: 'TestButUpdated',
      lastName: 'UserButUpdated',
      phoneNumber: '999-999-9999',
      isRegistered: true,
    };
    frosh = await FroshServices.updateFroshInfo(frosh.id, updateInfo);
    assert(frosh.firstName === 'TestButUpdated');
  });

  it('.updateFroshInfo(userId, updateInfo)\t\t\t|\tUpdating Frosh Information (INVALID USER ID)', async () => {
    await assert.rejects(FroshServices.updateFroshInfo('999999', updateInfo), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_FROSH',
    });
  });

  it('.getFilteredFroshInfo(query, projection)\t\t\t|\tGetting Frosh Information', async () => {
    const query = {};
    const query2 = { isRegistered: true };
    const filter = { _id: 1 };
    const filteredFrosh = await FroshServices.getFilteredFroshInfo(query, filter);
    const filteredFrosh2 = await FroshServices.getFilteredFroshInfo(query2, filter);
    assert(filteredFrosh.length > 0 && filteredFrosh2.length > 0);
  });

  it('.getFilteredUserInfo(query, projection)\t\t\t|\tGetting User Information', async () => {
    const query = {};
    const query2 = { isRegistered: true };
    const filter = { _id: 1 };
    const filteredUsers = await FroshServices.getFilteredUserInfo(query, filter);
    const filteredUsers2 = await FroshServices.getFilteredUserInfo(query2, filter);
    assert(filteredUsers.length > 0 && filteredUsers2.length > 0);
  });
});
