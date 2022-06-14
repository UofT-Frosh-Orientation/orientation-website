const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const ScheduleController = require('../controllers/ScheduleController');

const router = express.Router();

router.get(
  '/read',
  // checkLoggedIn,
  ScheduleController.getGroupSchedule,
);

router.post(
  '/add',
  // checkLoggedIn,
  // hasAuthScopes(['schedule:add']),
  ScheduleController.addSchedule,
);

router.put(
  '/edit',
  //   checkLoggedIn,
  //   hasAuthScopes(['schedule:edit']),
  ScheduleController.editSchedule,
);

router.put(
  '/change',
  //   checkLoggedIn,
  //   hasAuthScopes(['schedule:edit']),
  ScheduleController.changeSchedule,
);

router.delete(
  '/delete',
  //   checkLoggedIn,
  //   hasAuthScopes(['schedule:delete']),
  ScheduleController.deleteSchedule,
);

module.exports = router;
