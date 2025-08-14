const froshRouter = require('../routes/froshRoutes');
const userRouter = require('../routes/userRoutes');
const timelineRouter = require('../routes/timelineRoutes');
const faqRouter = require('../routes/faqRoutes');
const paymentRouter = require('../routes/paymentRoutes');
const announcementRouter = require('../routes/announcementRoutes');
const qrRouter = require('../routes/qrRoutes');
const scuntRouter = require('../routes/scuntRoutes');
const scuntMissionRouter = require('../routes/scuntMissionRoutes');
const scuntTeamRouter = require('../routes/scuntTeamRoutes');
const scuntGameSettingsRouter = require('../routes/scuntGameSettingsRoutes');
const uploadRouter = require('../middlewares/upload');
const { viewWaiver } = require('../controllers/UserController');

const routerLoader = (app) => {
  app.use('/frosh', froshRouter);
  app.use('/user', userRouter);
  app.use('/timeline', timelineRouter);
  app.use('/faq', faqRouter);
  app.use('/payment', paymentRouter);
  app.use('/announcements', announcementRouter);
  app.use('/qr', qrRouter);
  app.use('/skule-hunt-missions', scuntMissionRouter);
  app.use('/scunt-teams', scuntTeamRouter);
  app.use('/skule-hunt-game-controls', scuntGameSettingsRouter);
  app.use('/scunt', scuntRouter);
  app.use('/upload-waiver', userRouter);
  app.use('/view-waiver', userRouter);
  app.get('/user/view-waiver/:id', viewWaiver);
  app.use('/frosh', uploadRouter);
  //default route
  app.get('*', (req, res) => {
    res.status(200).send('Orientation Backend!');
  });
};

module.exports = routerLoader;
