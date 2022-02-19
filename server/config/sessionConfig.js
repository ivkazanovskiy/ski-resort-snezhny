const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  store: new FileStore({ reapAsync: true }),
  secret: 'keyboard cat',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  // ^^^ создание сессии либо сразу, либо после
  //  присвоения любого поля объекту req.session
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
};

module.exports = sessionConfig;
