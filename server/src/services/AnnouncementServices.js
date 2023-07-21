/**
 * Global Announcement objet
 * @typedef {import("../models/AnnouncementModel").Announcement} Announcement
 */
const AnnouncementModel = require('../models/AnnouncementModel');
const UserModel = require('../models/UserModel');
const announcementSubscription = require('../subscribers/announcementSubscription');

const AnnouncementServices = {
  /**
   * @description Gets all announcements
   * @returns {Announcement[]} All announcements
   */
  async getAll() {
    return AnnouncementModel.find({}).then(
      (announcements) => {
        return announcements.sort({ dateCreated: -1 });
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_ALL_ANNOUNCEMENTS', { cause: error });
      },
    );
  },

  /**
   * @description marks an announcement as completed for a user
   * @param {String} id announcement id
   * @param {User} currentUser current user
   * @returns {User} updated user
   */
  async complete(id, currentUser) {
    var listOfCompleted = currentUser.completedAnnouncements;
    const completedAnnouncement = AnnouncementModel.findOne({ _id: id }).then(
      (announcement) => announcement,
      (error) => {
        throw error;
      },
    );
    let removeIndex;
    if (
      listOfCompleted.every((value, index) => {
        if (value.id === completedAnnouncement.id) {
          removeIndex = index;
        }
        return value.id != completedAnnouncement.id;
      })
    ) {
      listOfCompleted.push({
        _id: completedAnnouncement.id,
        announcementName: completedAnnouncement.name,
      });
    } else {
      listOfCompleted.splice(removeIndex, 1);
    }
    return UserModel.findOneAndUpdate(
      { _id: currentUser._id },
      { completedAnnouncements: listOfCompleted },
    ).then(
      (user) => user,
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_USER', { cause: error });
      },
    );
  },

  /**
   * @description Gets all announcements that have been completed by a user
   * @param {user} currentUser current user
   * @returns {Announcement[]}
   */
  async getCompleted(currentUser) {
    return AnnouncementModel.find({
      _id: { $in: currentUser.completedAnnouncements },
    }).then((announcements) => {
      return announcements.sort({ dateCreated: -1 }, (error) => {
        throw new Error('UNABLE_TO_GET_COMPLETED_ANNOUNCEMENTS', { cause: error });
      });
    });
  },

  /**
   * @description Updates an announcement
   * @param {String} id announcement id
   * @param {Announcement} announcementElement announcement fields to be updated
   * @returns {Announcement}
   */
  async update(id, announcementElement) {
    return AnnouncementModel.findOneAndUpdate({ _id: id }, announcementElement).then(
      (announcement) => announcement,
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_ANNOUNCEMENT', { cause: error });
      },
    );
  },

  /**
   * @description Creates a new announcement
   * @param {Announcement} announcementElement new announcement to be created
   * @returns {Announcement}
   */
  async create(announcementElement) {
    return AnnouncementModel.create(announcementElement).then(
      (newAnnouncement) => {
        if (newAnnouncement.sendAsEmail === true) {
          announcementSubscription.add(newAnnouncement);
        }
        return newAnnouncement;
      },
      (error) => {
        throw new Error('UNABLE_TO_CREATE_ANNOUNCEMENT', { cause: error });
      },
    );
  },

  /**
   * @description Deletes an announcement
   * @param {String} id announcement id
   * @returns {Announcement}
   */
  async delete(id) {
    return AnnouncementModel.findOneAndDelete({ _id: id }).then(
      (deletedAnnouncement) => deletedAnnouncement,
      (error) => {
        throw new Error('UNABLE_TO_DELETE_ANNOUNCEMENT', { cause: error });
      },
    );
  },
};
module.exports = AnnouncementServices;
