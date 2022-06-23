const AnnouncementModel = require('../models/AnnouncementModel');

const AnnouncementServices = {
  //params announcementElement: [Model Element]
  async updateAnnouncementElement(id, announcementElement) {
    return await AnnouncementModel.findOneAndUpdate({ _id: id }, announcementElement);
  },
  //params announcementElement: []
  async saveNewAnnouncementElement(announcementElement) {
    const announcementModel = new AnnouncementModel(announcementElement);

    return await announcementModel.save();
  },

  async deleteAnnouncementElement(id) {
    return await AnnouncementModel.findOneAndDelete({ _id: id });
  },
};

module.exports = AnnouncementServices;
