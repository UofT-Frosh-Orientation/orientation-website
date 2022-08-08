const express = require('express');
// const checkLoggedIn = require('../middlewares/checkLoggedIn');
// const hasAuthScopes = require('../middlewares/hasAuthScopes');

const {
  getAnnouncement,
  getCompletedAnnouncements,
  completeAnnouncement,
  updateAnnouncementElement,
  createAnnouncementElement,
  deleteAnnouncementElement,
} = require('../controllers/AnnouncementController');

const router = express.Router();

router.get('/', getAnnouncement);

router.get('/completedAnnouncements', getCompletedAnnouncements);

router.put(
  '/:id/complete',
  // checkLoggedIn,
  completeAnnouncement,
);

router.put(
  '/:id/edit',
  // checkLoggedIn,
  // hasAuthScopes(['announcements:edit']),
  updateAnnouncementElement,
);

router.post(
  '/create',
  // checkLoggedIn,
  // hasAuthScopes(['announcements:create']),
  createAnnouncementElement,
);

router.delete(
  '/:id/delete',
  // checkLoggedIn,
  // hasAuthScopes(['announcements:delete']),
  deleteAnnouncementElement,
);

module.exports = router;
