/* eslint-disable no-undef */
const AnnouncementServices = require('../../src/services/AnnouncementServices');
const UserModel = require('../../src/models/UserModel');
const assert = require('assert');

describe('Testing Announcements Services', () => {
  let createdAnnouncement;

  it('.create()\t\t\t|\tCreate an announcement', async () => {
    const announcement = {
      name: 'Test Announcement',
      description: 'This is a test announcement',
      sendAsEmail: true,
    };
    createdAnnouncement = await AnnouncementServices.create(announcement);
    assert(createdAnnouncement.name === 'Test Announcement');
    assert(createdAnnouncement.description === 'This is a test announcement');
  });

  it('.create()\t\t\t|\tCreate multiple announcements', async () => {
    const announcement = {
      name: 'Test Announcement',
      description: 'This is a test announcement',
      sendAsEmail: false,
    };
    await AnnouncementServices.create(announcement);
    await AnnouncementServices.create(announcement);
    await AnnouncementServices.create(announcement);
    await AnnouncementServices.create(announcement);
    await AnnouncementServices.create(announcement);
  });

  it('.create()\t\t\t|\tCreate an announcement (INVALID ANNOUNCEMENT)', async () => {
    const announcement = {
      description: 'This is a test announcement',
      sendAsEmail: false,
    };
    await assert.rejects(AnnouncementServices.create(announcement), {
      name: 'Error',
      message: 'UNABLE_TO_CREATE_ANNOUNCEMENT',
    });
  });

  it('.getAll()\t\t\t|\tShould return an array of announcements', async () => {
    const announcements = await AnnouncementServices.getAll();
    assert.notEqual(announcements.length, 0);
    assert.equal(announcements.length, 6);
    assert(
      announcements.every(
        (announcement) =>
          announcement.name === 'Test Announcement' &&
          announcement.description === 'This is a test announcement',
      ),
    );
  });

  it(".update()\t\t\t|\tShould update an announcement's name", async () => {
    const updatedAnnouncement = await AnnouncementServices.update(createdAnnouncement.id, {
      name: 'Updated Announcement',
    });
    assert.equal(updatedAnnouncement.name, 'Updated Announcement');
    assert.equal(updatedAnnouncement.id, createdAnnouncement.id);
  });

  it(".update()\t\t\t|\tShould update an announcement's description", async () => {
    const updatedAnnouncement = await AnnouncementServices.update(createdAnnouncement.id, {
      description: 'Updated Announcement Description',
    });
    assert.equal(updatedAnnouncement.description, 'Updated Announcement Description');
    assert.equal(updatedAnnouncement.id, createdAnnouncement.id);
  });

  it('.update()\t\t\t|\tShould update an announcement (INVALID ID)', async () => {
    await assert.rejects(
      AnnouncementServices.update('createdAnnouncement.id', {
        description: 'Updated Announcement Description',
      }),
      { name: 'Error', message: 'UNABLE_TO_UPDATE_ANNOUNCEMENT' },
    );
  });

  it('.delete()\t\t\t|\tShould delete an announcement', async () => {
    const deletedAnnouncement = await AnnouncementServices.delete(createdAnnouncement.id);
    assert.equal(deletedAnnouncement.id, createdAnnouncement.id);
  });

  it('.delete()\t\t\t|\tCheck deleted announcement (DELETED ID)', async () => {
    await assert.rejects(AnnouncementServices.delete(createdAnnouncement.id), {
      name: 'Error',
      message: 'ANNOUNCEMENT_NOT_FOUND',
    });
  });

  it('.delete()\t\t\t|\tCheck deleted announcement (INVALID ID)', async () => {
    await assert.rejects(AnnouncementServices.delete(''), {
      name: 'Error',
      message: 'UNABLE_TO_DELETE_ANNOUNCEMENT',
    });
  });

  it('.update()\t\t\t|\tShould update an announcement (DELETED ID)', async () => {
    await assert.rejects(
      AnnouncementServices.update(createdAnnouncement.id, {
        description: 'Updated Announcement Description',
      }),
      { name: 'Error', message: 'ANNOUNCEMENT_NOT_FOUND' },
    );
  });

  let testUser;
  let toComplete;
  it('.complete(id, userID)\t|\tMark an announcement as complete for a user', async () => {
    testUser = await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      hashedPassword: 'test',
    });
    const announcement = {
      name: 'Test Announcement',
      description: 'This is a test announcement',
      sendAsEmail: false,
    };
    toComplete = await AnnouncementServices.create(announcement);
    const completedAnnouncements = await AnnouncementServices.complete(toComplete.id, testUser.id);
    assert.equal(completedAnnouncements.length, 1);
    assert.equal(completedAnnouncements[0].announcementID, toComplete.id);
    assert.equal(completedAnnouncements[0].announcementName, toComplete.name);
  });

  it('.getCompleted(id)\t\t|\tShould return an array of completed announcements', async () => {
    const completedAnnouncements = await AnnouncementServices.getCompleted(testUser);
    assert.equal(completedAnnouncements.length, 1);
    assert.equal(completedAnnouncements[0].id, toComplete.id);
    assert.equal(completedAnnouncements[0].name, toComplete.name);
  });

  it('.getCompleted(id)\t\t|\tShould return an array of completed announcements (INVALID ANNOUNCEMENT ID)', async () => {
    const user = await UserModel.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test1@test.com',
      hashedPassword: 'test',
      completedAnnouncements: [
        {
          announcementID: '',
        },
      ],
    });
    await assert.rejects(AnnouncementServices.getCompleted(user.id), {
      name: 'Error',
      message: 'UNABLE_TO_GET_COMPLETED_ANNOUNCEMENTS',
    });
  });

  it('.getCompleted(id)\t\t|\tShould return an array of completed announcements (INVALID USER ID)', async () => {
    await assert.rejects(AnnouncementServices.getCompleted(''), {
      name: 'Error',
      message: 'UNABLE_TO_GET_USER',
    });
  });

  it('.complete(id, userID)\t|\tMark an announcement as incomplete for a user', async () => {
    const completedAnnouncements = await AnnouncementServices.complete(toComplete.id, testUser.id);
    assert.equal(completedAnnouncements.length, 0);
  });

  it('.complete(id, userID)\t|\tMark an announcement as complete for a user (DUPLICATE)', async () => {
    const announcement = {
      name: 'Test Announcement',
      description: 'This is a test announcement',
      sendAsEmail: false,
    };
    toComplete = await AnnouncementServices.create(announcement);
    const completedAnnouncements = await AnnouncementServices.complete(toComplete.id, testUser.id);
    assert.equal(completedAnnouncements.length, 1);
    assert.equal(completedAnnouncements[0].announcementID, toComplete.id);
    assert.equal(completedAnnouncements[0].announcementName, toComplete.name);
  });

  it('.complete(id, userID)\t|\tMark an announcement as complete (INVALID ANNOUNCEMENT ID)', async () => {
    await assert.rejects(AnnouncementServices.complete('', testUser), {
      name: 'Error',
      message: 'UNABLE_TO_GET_ANNOUNCEMENT',
    });
  });

  it('.complete(id, userID)\t|\tMark an announcement as complete (DELETED ANNOUNCEMENT ID)', async () => {
    await assert.rejects(AnnouncementServices.complete(createdAnnouncement.id, testUser), {
      name: 'Error',
      message: 'ANNOUNCEMENT_NOT_FOUND',
    });
  });

  it('.complete(id, userID)\t|\tMark an announcement as complete (INVALID USER)', async () => {
    await assert.rejects(AnnouncementServices.complete(toComplete.id, ''), {
      name: 'Error',
      message: 'UNABLE_TO_GET_USER',
    });
  });

  it('.complete(id, userID)\t|\tMark an announcement as complete (DELETED USER)', async () => {
    await UserModel.deleteOne({ _id: testUser.id });
    await assert.rejects(AnnouncementServices.complete(toComplete.id, testUser.id), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });

  it('.getCompleted(id)\t\t|\tShould return an array of completed announcements (DELETED USER ID)', async () => {
    await assert.rejects(AnnouncementServices.getCompleted(testUser.id), {
      name: 'Error',
      message: 'USER_NOT_FOUND',
    });
  });
});
