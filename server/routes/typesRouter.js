const router = require('express').Router();
const { Type } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const types = await Type.findAll({
        raw: true,
      });
      res.status(200).json({ types });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
