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
    return AnnouncementModel.find({})
      .sort({ dateCreated: -1 })
      .then(
        (announcements) => {
          return announcements;
        },
        (error) => {
          throw new Error('UNABLE_TO_GET_ALL_ANNOUNCEMENTS', { cause: error });
        },
      );
  },

  /**
   * @description marks an announcement as completed for a user OR removes it from the completed list
   * @param {String} id announcement id
   * @param {String} userID current user id
   * @returns {User} updated user
   */
  async complete(id, userID) {
    const currentUser = await UserModel.findOne({ _id: userID }).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
    var listOfCompleted = currentUser.completedAnnouncements;
    const completedAnnouncement = await AnnouncementModel.findOne({ _id: id }).then(
      (announcement) => {
        if (!announcement) throw new Error('ANNOUNCEMENT_NOT_FOUND');
        return announcement;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_ANNOUNCEMENT', { cause: error });
      },
    );
    let removeIndex;
    if (
      listOfCompleted.every((value, index) => {
        if (value.announcementID === completedAnnouncement.id) {
          removeIndex = index;
        }
        return value.announcementID != completedAnnouncement.id;
      })
    ) {
      listOfCompleted.push({
        announcementID: completedAnnouncement.id,
        announcementName: completedAnnouncement.name,
      });
    } else {
      listOfCompleted.splice(removeIndex, 1);
    }
    currentUser.completedAnnouncements = listOfCompleted;
    return currentUser.save().then(
      (user) => {
        return user.completedAnnouncements;
      },
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
  async getCompleted(id) {
    const currentUser = await UserModel.findOne({ _id: id }).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
    return AnnouncementModel.find({
      _id: { $in: currentUser.completedAnnouncements.map((value) => value.announcementID) },
    })
      .sort({ dateCreated: -1 })
      .then(
        (announcements) => announcements,
        (error) => {
          throw new Error('UNABLE_TO_GET_COMPLETED_ANNOUNCEMENTS', { cause: error });
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
        if (announcementElement.sendAsEmail === true) {
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
   * @description Updates an announcement
   * @param {String} id announcement id
   * @param {Announcement} announcementElement announcement fields to be updated
   * @returns {Announcement}
   */
  async update(id, announcementElement) {
    return AnnouncementModel.findOneAndUpdate(
      { _id: id },
      { ...announcementElement },
      { new: true },
    ).then(
      (announcement) => {
        if (!announcement) throw new Error('ANNOUNCEMENT_NOT_FOUND');
        return announcement;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_ANNOUNCEMENT', { cause: error });
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
      (deletedAnnouncement) => {
        if (!deletedAnnouncement) throw new Error('ANNOUNCEMENT_NOT_FOUND');
        return deletedAnnouncement;
      },
      (error) => {
        throw new Error('UNABLE_TO_DELETE_ANNOUNCEMENT', { cause: error });
      },
    );
  },
};
module.exports = AnnouncementServices;
