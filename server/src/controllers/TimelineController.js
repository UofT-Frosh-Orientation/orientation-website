const TimelineServices = require('../services/TimelineServices');

const TimelineModel = require('../models/TimelineModel');

const TimelineController = {
  async getTimeline(req, res, next) {
    try {
      const allTimelines = await TimelineServices.getAllTimelines();
      return res.status(200).send({ Timelines: allTimelines });
    } catch (e) {
      next(e);
    }
  },

  async updateTimelineElement(req, res, next) {
    const TimelineData = req.body;
    const id = req.params.id;

    try {
      const TimelineRecord = {
        date: TimelineData.date,
        name: TimelineData.name,
        description: TimelineData.description,
      };
      
      await TimelineServices.updateTimelineElement(id, TimelineRecord);
      return res.status(200).send({ message: 'Successfully updated Timeline element!' });
    } catch (e) {
      next(e);
    }
  },

  async createTimelineElement(req, res, next) {
    const TimelineData = req.body;

    try {
      const TimelineRecord = {
        date: TimelineData.date,
        name: TimelineData.name,
        description: TimelineData.description,
      };

      await TimelineServices.saveNewTimelineElement(TimelineRecord);
      return res.status(200).send({ message: 'Successfully added Timeline element!' });
    } catch (e) {
      next(e);
    }
  },

  async deleteTimelineElement(req, res, next) {
    const id = req.params.id;

    try {
      await TimelineServices.deleteTimelineElement(id);
      return res.status(200).send({ message: 'Successfully deleted Timeline element!' });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = TimelineController;
