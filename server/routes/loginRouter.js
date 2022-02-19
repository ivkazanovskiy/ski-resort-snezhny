const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const userAttributes = require('../helpers/userAttributes');
require('dotenv').config();

router.route('/')
  .post(async (req, res) => {
    let user;
    const { email, password } = req.body;

    try {
      user = await User.findOne({
        where: { email },
      });
    } catch (err) {
      return res.json({ message: 'dbError' });
    }

    if (!user) { return res.json({ message: 'notFound' }); }

    if (await bcrypt.compare(password, user.password)) {
      const info = userAttributes(user);
      const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ message: 'authorized', token });
    }
    res.json({ message: 'incorrectPassword' });
  });
module.exports = router;
