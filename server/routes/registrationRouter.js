const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const isValid = require('../helpers/isValid');
const userAttributes = require('../helpers/userAttributes');
require('dotenv').config();

router.route('/')
  .post(async (req, res) => {
    if (!isValid(req.body)) {
      return res.sendStatus(400);
    }

    const { name, email, password: passwordUnsec } = req.body;
    const password = await bcrypt.hash(passwordUnsec, 10);

    try {
      const user = await User.create({ name, email, password });
      const info = userAttributes(user);
      const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ token });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') return res.sendStatus(501);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
