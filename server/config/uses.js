const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

function uses(app) {
  app.use(helmet());
  app.use(logger('dev'));
  app.use(express.static('src'));
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(cors(corsConfig));
  app.use(cookieParser());
}

module.exports = uses;
