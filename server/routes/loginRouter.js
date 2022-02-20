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
      return res.status(500).json({ error: err.message });
    }

    if (!user) res.sendStatus(404);

    if (await bcrypt.compare(password, user.password)) {
      const info = userAttributes(user);
      const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ token });
    }

    // incorrect password
    return res.sendStatus(400);
  });
module.exports = router;
