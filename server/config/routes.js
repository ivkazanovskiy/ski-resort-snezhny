const loginRouter = require('../routes/loginRouter');
const registrationRouter = require('../routes/registrationRouter');
const checkUserRouter = require('../routes/checkUserRouter');
const trainingOrdersRouter = require('../routes/trainingOrdersRouter');
const updateUserRouter = require('../routes/updateUserRouter');

const authUser = require('../middleware/authUser');

function routes(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/registration', registrationRouter);
  app.use('/api/checkUser', authUser, checkUserRouter);
  app.use('/api/trainingOrders', authUser, trainingOrdersRouter);
  app.use('/api/updateUser', authUser, updateUserRouter);
}

module.exports = routes;
