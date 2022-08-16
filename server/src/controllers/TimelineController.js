const TimelineServices = require('../services/TimelineServices');

const TimelineController = {
  async getTimeline(req, res, next) {
    try {
      const allTimelines = await TimelineServices.getAllTimelines();
      return res.status(200).send({ timelines: allTimelines });
    } catch (e) {
      next(e);
    }
  },

  async updateTimelineElement(req, res, next) {
    const { date, eventName, description, link, linkLabel } = req.body;
    const { id } = req.params;
    try {
      await TimelineServices.updateTimelineElement(
        id,
        date,
        eventName,
        description,
        link,
        linkLabel,
      );
      return res.status(200).send({ message: 'Successfully updated Timeline element!' });
    } catch (e) {
      next(e);
    }
  },

  async createTimelineElement(req, res, next) {
    const { date, eventName, description, link, linkLabel } = req.body;
    try {
      await TimelineServices.saveNewTimelineElement(date, eventName, description, link, linkLabel);
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
