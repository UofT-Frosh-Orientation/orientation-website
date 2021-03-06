const AnnouncementModel = require('../models/AnnouncementModel');
const UserModel = require('../models/UserModel');

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

  async completeAnnouncementElement(id, currentUser) {
    var listOfCompleted = currentUser.completedAnnouncements;
    return new Promise((resolve, reject) => {
      AnnouncementModel.findOne({ _id: id }, (err, announcement) => {
        if (err) {
          reject(err);
        } else {
          const index = listOfCompleted.indexOf(id);

          //if announcement is completed -> remove from completed
          if (index != -1) {
            listOfCompleted.splice(index, 1);
          } else {
            listOfCompleted.push(announcement._id);
          }

          resolve(
            UserModel.findOneAndUpdate(
              { _id: currentUser._id },
              { completedAnnouncements: listOfCompleted },
              (err, user) => {
                if (err || !user) {
                  reject('UNABLE_TO_UPDATE_USER');
                } else {
                  resolve(user);
                }
              },
            ),
          );
        }
      });
    });
  },

  async getCompletedAnnouncements(currentUser) {
    return new Promise((resolve, reject) => {
      AnnouncementModel.find(
        {
          _id: { $in: currentUser.completedAnnouncements },
        },
        (err, announcements) => {
          if (err) {
            reject(err);
          } else {
            resolve(announcements);
          }
        },
      );
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
