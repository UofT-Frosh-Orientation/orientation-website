/* eslint-disable no-undef */
const TimelineServices = require('../../src/services/TimelineServices');
const assert = require('assert');

describe('TimelineServices', () => {
  let createdTimeline;
  it('.create()', async () => {
    createdTimeline = await TimelineServices.create(
      new Date(),
      'Test Event',
      'Test Description',
      'Test Link',
      'Test Link Label',
    );
    assert.equal(createdTimeline.eventName, 'Test Event');
    assert.equal(createdTimeline.description, 'Test Description');
    assert.equal(createdTimeline.link, 'Test Link');
    assert.equal(createdTimeline.linkLabel, 'Test Link Label');
  });

  it('.getAll()', async () => {
    const timelines = await TimelineServices.getAll();
    assert.equal(timelines.length, 1);
  });

  it('.update()', async () => {
    const updatedTimeline = await TimelineServices.update(
      createdTimeline._id,
      new Date(),
      'Test Event Updated',
      'Test Description Updated',
      'Test Link Updated',
      'Test Link Label Updated',
    );
    assert.equal(updatedTimeline.eventName, 'Test Event Updated');
    assert.equal(updatedTimeline.description, 'Test Description Updated');
    assert.equal(updatedTimeline.link, 'Test Link Updated');
    assert.equal(updatedTimeline.linkLabel, 'Test Link Label Updated');
  });

  it('.update() invalid id', async () => {
    await assert.rejects(
      TimelineServices.update(
        'createdTimeline._id',
        new Date(),
        'Test Event Updated',
        'Test Description Updated',
        'Test Link Updated',
        'Test Link Label Updated',
      ),
      {
        name: 'Error',
        message: 'UNABLE_TO_UPDATE_TIMELINE',
      },
    );
  });

  it('.update() no timeline', async () => {
    await assert.rejects(
      TimelineServices.update(
        '353b24b4b4b4b4b4b4b4b4b4',
        new Date(),
        'Test Event Updated',
        'Test Description Updated',
        'Test Link Updated',
        'Test Link Label Updated',
      ),
      {
        name: 'Error',
        message: 'TIMELINE_NOT_FOUND',
      },
    );
  });

  it('.delete(id)', async () => {
    const timeline = await TimelineServices.delete(createdTimeline._id);
    assert.equal(timeline.id, createdTimeline.id);
  });

  it('.delete(id) invalid id', async () => {
    await assert.rejects(TimelineServices.delete('createdTimeline._id'), {
      name: 'Error',
      message: 'UNABLE_TO_DELETE_TIMELINE',
    });
  });

  it('.delete(id) no timeline', async () => {
    await assert.rejects(TimelineServices.delete('353b24b4b4b4b4b4b4b4b4b4'), {
      name: 'Error',
      message: 'TIMELINE_NOT_FOUND',
    });
  });
});
