/* eslint-disable no-undef */
const FroshServices = require('../../src/services/FroshServices');
const UserModel = require('../../src/models/UserModel');
const FroshModel = require('../../src/models/FroshModel');
const FroshGroupModel = require('../../src/models/FroshGroupModel');
const assert = require('assert');

describe('Testing Frosh Services', () => {


  it('.getNewFroshGroup(discipline, pronouns, froshGroupList)\t\t\t|\tGetting a new Frosh Group (PREMADE LIST)', async () => {
    const discipline = "Electrical & Computer";
    const pronouns = "she/her";
    const alphaGroup = await FroshGroupModel.create({
      name: 'alpha',
      icon: 'α'
    });
    const betaGroup = await FroshGroupModel.create({
      name: 'beta',
      icon: 'β'
    });
    const froshGroupList = [
      alphaGroup, betaGroup
    ]
  
    const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
      discipline,
      pronouns,
      froshGroupList
    );
    assert(froshGroup === "alpha");
  });

  it('.getNewFroshGroup(discipline, pronouns, froshGroupList)\t\t\t|\tGetting a new Frosh Group (Using .find() FroshGroupModel)', async () => {
    const discipline = "Electrical & Computer";
    const pronouns = "she/her";
    const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
      discipline,
      pronouns,
    );
    assert(froshGroup === "alpha");
  });
  
  it('.initFroshGroups(groups)\t\t\t|\tInitializing Frosh Groups', async () => {
    const groups = [
      {
        name: 'alpha',
        icon: 'α'
      },
      {
        name: 'beta',
        icon: 'α'
      },
      {
        name: 'gamma',
        icon: 'γ'
      },
      {
        name: 'delta',
        icon: 'δ'
      },
      {
        name: 'epsilon',
        icon: 'ε'
      }

    ]
    const froshGroupList = await FroshServices.initFroshGroups(
      groups
    );
    assert(froshGroupList[1].name === 'beta');
  });


});
