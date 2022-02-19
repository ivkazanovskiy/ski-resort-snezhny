const session = require('express-session');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const corsConfig = require('./corsConfig');
const cookieCleaner = require('../middleware/cookieCleaner');
const sessionConfig = require('./sessionConfig');

function uses(app) {
  app.use(logger('dev'));
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cookieCleaner);
}

module.exports = uses;
