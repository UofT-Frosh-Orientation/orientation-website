const AnnouncementServices = require('../services/AnnouncementServices');

const AnnouncementModel = require('../models/AnnouncementModel');

const AnnouncementController = {
  async getAnnouncement(req, res, next) {
    try {
      await AnnouncementModel.find()
        .lean()
        .exec((err, items) => {
          if (!err) {
            return res.json({ items });
          }
        });
    } catch (e) {
      next(e);
    }
  },

  async getAnnouncementElement(req, res, next) {
    const id = req.params.id;
    try {
      // have a form that automatically fills out fields with current model information
      // gets corresponding announcementelement informaiton to prefill form -> reroutes to edit form

      await AnnouncementModel.findOne({ _id: id }).exec((err, announcementElement) => {
        if (!err) {
          return res.json(announcementElement);
        }
      });
    } catch (e) {
      next(e);
    }
  },

  async updateAnnouncementElement(req, res, next) {
    const announcementData = req.body;
    const id = req.params.id;

    try {
      const announcementRecord = {
        description: announcementData.description,
      };

      await AnnouncementServices.updateAnnouncementElement(id, announcementRecord);
      return res.status(200).send({ message: 'Successfully updated announcement element!' });
    } catch (e) {
      next(e);
    }
  },

  async addAnnouncementElement(req, res, next) {
    const announcementData = req.body;

    try {
      //need to change for permissions - which users can access
      // await AnnouncementServices.validateUser(announcementData);
      const announcementRecord = {
        description: announcementData.description,
      };

      await AnnouncementServices.saveNewAnnouncementElement(announcementRecord);
      return res.status(200).send({ message: 'Successfully added announcement element!' });
    } catch (e) {
      next(e);
    }
  },

  async deleteAnnouncementElement(req, res, next) {
    const id = req.params.id;

    try {
      await AnnouncementServices.deleteAnnouncementElement(id);
      return res.status(200).send({ message: 'Successfully deleted announcement element!' });
    } catch (e) {
      next(e);
    }
  },

  // async changeAnnouncementOrder(req, res, next) {

  // }
};

module.exports = AnnouncementController;
