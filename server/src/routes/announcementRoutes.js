const express = require('express');

const {
  getAnnouncement,
  getAnnouncementElement,
  updateAnnouncementElement,
  addAnnouncementElement,
  deleteAnnouncementElement,
} = require('../controllers/AnnouncementController');

const router = express.Router();

router.get('/', getAnnouncement);

router.get('/:id', getAnnouncementElement);

router.put('/:id/edit', updateAnnouncementElement);

router.post('/add', addAnnouncementElement);

router.delete('/:id/delete', deleteAnnouncementElement);

// router.post("/changeOrder", changeAnnouncementOrder);

module.exports = router;
