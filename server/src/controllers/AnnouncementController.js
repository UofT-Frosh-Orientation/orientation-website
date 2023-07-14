const AnnouncementServices = require('../services/AnnouncementServices');

const AnnouncementController = {
  async getAnnouncement(req, res, next) {
    try {
      const allAnnouncements = await AnnouncementServices.getAllAnnouncements();
      return res.status(200).send({ announcements: allAnnouncements });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to get announcement', e });
      next(e);
    }
  },

  async getCompletedAnnouncements(req, res, next) {
    const currentUser = req.user;
    try {
      const completedAnnouncements = await AnnouncementServices.getCompletedAnnouncements(
        currentUser,
      );
      return res.status(200).send({ announcements: completedAnnouncements });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to get completed announcements: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  async completeAnnouncement(req, res, next) {
    const currentUser = req.user;
    const announcementId = req.params.id;
    try {
      const completedAnnouncements = await AnnouncementServices.completeAnnouncementElement(
        announcementId,
        currentUser,
      );
      res.status(200).send({ announcements: completedAnnouncements });
      // res.status(200).send({ message: 'Successfully completed announcement element!' });
    } catch (e) {
      req.log.fatal({
        msg: 'User unable to complete announcement: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  async updateAnnouncementElement(req, res, next) {
    const data = req.body.announcementData;
    const id = req.params.id;

    try {
      await AnnouncementServices.updateAnnouncementElement(id, data);
      return res.status(200).send({ message: 'Successfully updated announcement element!' });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to update announcement element', e });
      next(e);
    }
  },

  async createAnnouncementElement(req, res, next) {
    const data = req.body.announcementData;

    try {
      await AnnouncementServices.saveNewAnnouncementElement(data);
      return res.status(200).send({ message: 'Successfully added announcement element!' });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to create announcement', e });
      next(e);
    }
  },

  async deleteAnnouncementElement(req, res, next) {
    const id = req.params.id;

    try {
      await AnnouncementServices.deleteAnnouncementElement(id);
      return res.status(200).send({ message: 'Successfully deleted announcement element!' });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to delete announcement', e });
      next(e);
    }
  },
};

module.exports = AnnouncementController;
