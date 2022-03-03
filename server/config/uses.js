const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
// const cors = require('cors');
// const corsConfig = require('./corsConfig');

function uses(app) {
  app.use(logger('dev'));
  app.use(express.static('src'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, '../../clent/build')));

  // app.use(cors(corsConfig));
  app.use(cookieParser());
}

module.exports = uses;
