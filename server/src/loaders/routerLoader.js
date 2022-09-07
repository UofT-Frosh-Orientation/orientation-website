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

const routerLoader = (app) => {
  app.use('/frosh', froshRouter);
  app.use('/user', userRouter);
  app.use('/timeline', timelineRouter);
  app.use('/faq', faqRouter);
  app.use('/payment', paymentRouter);
  app.use('/announcements', announcementRouter);
  app.use('/qr', qrRouter);
  app.use('/scunt-missions', scuntMissionRouter);
  app.use('/scunt-teams', scuntTeamRouter);
  app.use('/scunt-game-controls', scuntGameSettingsRouter);
  app.use('/scunt', scuntRouter);
  //default route
  app.get('*', (req, res) => {
    res.status(200).send('Orientation Backend!');
  });
};

module.exports = routerLoader;
