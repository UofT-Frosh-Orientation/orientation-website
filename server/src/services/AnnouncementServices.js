const AnnouncementModel = require('../models/AnnouncementModel');

const AnnouncementServices = {
  async getAllAnnouncements() {
    return new Promise((resolve, reject) => {
      AnnouncementModel.find({}, (err, announcements) => {
        if (err) {
          reject(err);
        } else {
          resolve(announcements);
        }
      });
    });
  },

  async getAnnouncementElement(id) {
    return new Promise((resolve, reject) => {
      AnnouncementModel.findOne({ _id: id }, (err, announcement) => {
        if (err) {
          reject(err);
        } else {
          resolve(announcement);
        }
      });
    });
  },

  async updateAnnouncementElement(id, announcementElement) {
    return new Promise((resolve, reject) => {
      AnnouncementModel.findOneAndUpdate({ _id: id }, announcementElement, (err, announcement) => {
        if (err || !announcement) {
          reject('UNABLE_TO_UPDATE_ANNOUNCEMENT');
        } else {
          resolve(announcement);
        }
      });
    });
  },

  async saveNewAnnouncementElement(announcementElement) {
    return new Promise((resolve, reject) => {
      AnnouncementModel.create(announcementElement, (err, newAnnouncement) => {
        if (err) {
          reject(err);
        } else {
          resolve(newAnnouncement);
        }
      });
    });
  },

  async deleteAnnouncementElement(id) {
    return new Promise((resolve, reject) => {
      AnnouncementModel.findOneAndDelete({ _id: id }, (err, deleteAnnouncement) => {
        if (err || !deleteAnnouncement) {
          reject('UNABLE_TO_DELETE_ANNOUNCEMENT');
        } else {
          resolve(deleteAnnouncement);
        }
      });
    });
  },
};

module.exports = AnnouncementServices;
