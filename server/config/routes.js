const loginRouter = require('../routes/loginRouter');
const logoutRouter = require('../routes/logoutRouter');
const registrationRouter = require('../routes/registrationRouter');
const checkUserRouter = require('../routes/checkUserRouter');

function routes(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/logout', logoutRouter);
  app.use('/api/registration', registrationRouter);
  app.use('/api/checkUser', checkUserRouter);
}

module.exports = routes;
