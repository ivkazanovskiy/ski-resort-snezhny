const loginRouter = require('../routes/loginRouter');
const registrationRouter = require('../routes/registrationRouter');
const checkUserRouter = require('../routes/checkUserRouter');

const updateUserRouter = require('../routes/updateUserRouter');
const trainerScheduleRouter = require('../routes/trainerScheduleRouter');
const scheduleRouter = require('../routes/scheduleRouter');
const trainersRouter = require('../routes/trainersRouter');

const authUser = require('../middleware/authUser');

function routes(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/registration', registrationRouter);
  app.use('/api/checkUser', authUser, checkUserRouter);
  app.use('/api/updateUser', authUser, updateUserRouter);
  app.use('/api/trainerSchedule', authUser, trainerScheduleRouter);
  app.use('/api/schedule', authUser, scheduleRouter);
  app.use('/api/trainers', authUser, trainersRouter);
}

module.exports = routes;
