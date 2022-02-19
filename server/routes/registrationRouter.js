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
      return res.json({ message: 'incorrect' });
    }

    const { name, email, password: passwordUnsec } = req.body;
    const password = await bcrypt.hash(passwordUnsec, 10);

    try {
      const user = await User.create({ name, email, password });
      const info = userAttributes(user);
      const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ message: 'added', token });
    } catch (error) {
      console.log('error', error.message);
      return res.json({ message: 'changeEmail' });
    }
  });

module.exports = router;
