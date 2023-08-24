/* eslint-disable no-undef */
const FroshGroupModel = require('../../src/models/FroshGroupModel');
const FroshModel = require('../../src/models/FroshModel');
const PaymentServices = require('../../src/services/PaymentServices');
const assert = require('assert');

describe('PaymentServices', () => {
  process.env.STRIPE_TICKET_PRICE_ID = 123;
  process.env.STRIPE_WEBHOOK_SECRET = 123;
  process.env.STRIPE_RETREAT_PRICE_ID = 123;
  process.env.RETREAT_MAX_TICKETS = 123;
  it('.decodeWebhookEvent(...)\t|\tDecoding a webhook event (UNABLE_TO_VERIFY_STRIPE_WEBHOOK)', async () => {
    await assert.rejects(PaymentServices.decodeWebhookEvent(undefined, undefined), {
      name: 'Error',
      message: 'UNABLE_TO_VERIFY_STRIPE_WEBHOOK',
    });
  });

  let testFrosh;
  it('.updatePayment(...)\t|\tUpdating a payment', async () => {
    await FroshGroupModel.create({
      name: 'test',
      totalNum: 0,
      icon: 'test',
    });
    testFrosh = await FroshModel.create({
      scuntPreferredMembers: [1, 2, 3],
      hashedPassword: 'test',
      firstName: `Test`,
      lastName: `Test`,
      email: `frosh@payments1.com`,
      legalName: `Test`,
      pronouns: 'Other',
      birthDate: new Date(),
      utorid: 'test123',
      discipline: 'Chemical',
      shirtSize: 'L',
      phoneNumber: '123456',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: 'test',
      bursaryRequested: false,
      attendingScunt: true,
      summerLocationCity: 'test',
      summerLocationCountry: 'test',
      photograph: true,
      froshGroup: 'test',
      isRegistered: false,
      froshGroupIcon: 'test',
      scuntTeam: 0,
      payments: [
        {
          item: 'Orientation Ticket',
          paymentIntent: '123',
          amountDue: 123,
        },
      ],
    });
    const updatedFrosh = await PaymentServices.updatePayment('123', 123);
    assert.equal(updatedFrosh.isRegistered, true);
  });

  it('.updatePayment(...)\t|\tUpdating a payment', async () => {
    await FroshGroupModel.create({
      name: 'test',
      totalNum: 0,
      icon: 'test',
    });
    testFrosh = await FroshModel.create({
      scuntPreferredMembers: [1, 2, 3],
      hashedPassword: 'test',
      firstName: `Test`,
      lastName: `Test`,
      email: `frosh@payments2.com`,
      legalName: `Test`,
      pronouns: 'Other',
      birthDate: new Date(),
      utorid: 'test123',
      discipline: 'Chemical',
      shirtSize: 'L',
      phoneNumber: '123456',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: 'test',
      bursaryRequested: false,
      attendingScunt: true,
      summerLocationCity: 'test',
      summerLocationCountry: 'test',
      photograph: true,
      froshGroup: 'test',
      isRegistered: true,
      froshGroupIcon: 'test',
      scuntTeam: 0,
      payments: [
        {
          item: 'Retreat Ticket',
          paymentIntent: '123456',
          amountDue: 123,
        },
      ],
    });
    const updatedFrosh = await PaymentServices.updatePayment('123456', 123);
    assert.equal(updatedFrosh.isRetreat, true);
  });

  it('.updatePayment(...)\t|\tUpdating a payment (FROSH_NOT_FOUND)', async () => {
    await assert.rejects(PaymentServices.updatePayment('123452131326', 123), {
      name: 'Error',
      message: 'FROSH_NOT_FOUND',
    });
  });

  it('.updatePayment(...)\t|\tUpdating a payment (FROSH_GROUP_NOT_FOUND)', async () => {
    await FroshModel.create({
      scuntPreferredMembers: [1, 2, 3],
      hashedPassword: 'test',
      firstName: `Test`,
      lastName: `Test`,
      email: `frosh@payments3.com`,
      legalName: `Test`,
      pronouns: 'Other',
      birthDate: new Date(),
      utorid: 'test123',
      discipline: 'Chemical',
      shirtSize: 'L',
      phoneNumber: '123456',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: 'test',
      bursaryRequested: false,
      attendingScunt: true,
      summerLocationCity: 'test',
      summerLocationCountry: 'test',
      photograph: true,
      froshGroup: 'none',
      isRegistered: false,
      froshGroupIcon: 'test',
      scuntTeam: 0,
      payments: [
        {
          item: 'Orientation Ticket',
          paymentIntent: 'test',
          amountDue: 123,
        },
      ],
    });
    const updatedFrosh = await PaymentServices.updatePayment('test', 123);
    assert.equal(updatedFrosh.isRegistered, true);
  });

  it('.updatePayment(...)\t|\tUpdating a payment (UNABLE_TO_UPDATE_FROSH)', async () => {
    await FroshModel.create({
      scuntPreferredMembers: [1, 2, 3],
      hashedPassword: 'test',
      firstName: `Test`,
      lastName: `Test`,
      email: `frosh@payments4.com`,
      legalName: `Test`,
      pronouns: 'Other',
      birthDate: new Date(),
      utorid: 'test123',
      discipline: 'Chemical',
      shirtSize: 'L',
      phoneNumber: '123456',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: 'test',
      bursaryRequested: false,
      attendingScunt: true,
      summerLocationCity: 'test',
      summerLocationCountry: 'test',
      photograph: true,
      froshGroup: 'none',
      isRegistered: false,
      froshGroupIcon: 'test',
      scuntTeam: 0,
      payments: [
        {
          item: 'Test 1',
          paymentIntent: 'test2',
          amountDue: 123,
        },
      ],
    });
    await assert.rejects(PaymentServices.updatePayment('test2', 123), {
      name: 'Error',
      message: 'UNABLE_TO_UPDATE_FROSH',
    });
  });

  it('.getNonExpiredPaymentsCountForItem(...)\t|\tGetting the number of non-expired payments for a given item', async () => {
    const count = await PaymentServices.getNonExpiredPaymentsCountForItem('Orientation Ticket');
    assert.equal(count, 2);
  });

  it('.expirePayment(...)\t|\tExpiring a payment', async () => {
    await FroshModel.create({
      scuntPreferredMembers: [1, 2, 3],
      hashedPassword: 'test',
      firstName: `Test`,
      lastName: `Test`,
      email: `frosh@payments5.com`,
      legalName: `Test`,
      pronouns: 'Other',
      birthDate: new Date(),
      utorid: 'test123',
      discipline: 'Chemical',
      shirtSize: 'L',
      phoneNumber: '123456',
      emergencyContactName: 'test',
      emergencyContactRelationship: 'test',
      emergencyContactNumber: 'test',
      bursaryRequested: false,
      attendingScunt: true,
      summerLocationCity: 'test',
      summerLocationCountry: 'test',
      photograph: true,
      froshGroup: 'none',
      isRegistered: false,
      froshGroupIcon: 'test',
      scuntTeam: 0,
      payments: [
        {
          item: 'Test 1',
          paymentIntent: 'test123',
          amountDue: 123,
        },
        {
          item: 'Test 1',
          paymentIntent: 'test123456',
          amountDue: 123,
        },
      ],
    });
    const updatedFrosh = await PaymentServices.expirePayment('test123');
    assert.equal(updatedFrosh.payments[0].expired, true);
  });

  it('.expirePayment(...)\t|\tExpiring a payment (FROSH_NOT_FOUND)', async () => {
    await assert.rejects(PaymentServices.expirePayment('none existent'), {
      name: 'Error',
      message: 'FROSH_NOT_FOUND',
    });
  });
});
