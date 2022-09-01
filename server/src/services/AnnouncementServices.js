const AnnouncementModel = require('../models/AnnouncementModel');
const UserModel = require('../models/UserModel');
const announcementSubscription = require('../subscribers/announcementSubscription');

const AnnouncementServices = {
  async getAllAnnouncements() {
    return new Promise((resolve, reject) => {
      AnnouncementModel.find({}, (err, announcements) => {
        if (err) {
          reject(err);
        } else {
          resolve(announcements);
        }
      }).sort({ dateCreated: -1 });
    });
  },

  async completeAnnouncementElement(id, currentUser) {
    var listOfCompleted = currentUser.completedAnnouncements;
    return new Promise((resolve, reject) => {
      AnnouncementModel.findOne({ _id: id }, (err, announcement) => {
        if (err) {
          reject(err);
        } else {
          let removeIndex;
          if (
            listOfCompleted.every((value, index) => {
              if (value.id === announcement.id) {
                removeIndex = index;
              }
              return value.id != announcement.id;
            })
          ) {

            listOfCompleted.push({ _id: announcement.id, announcementName: announcement.name });
          } else {
            listOfCompleted.splice(removeIndex, 1);
          }

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
      ).sort({ dateCreated: -1 });
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
          if (announcementElement.sendAsEmail === true) {
            announcementSubscription.add(announcementElement);
          }
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
