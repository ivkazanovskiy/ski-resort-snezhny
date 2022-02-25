const router = require('express').Router();
const { Trainer } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const trainers = await Trainer.findAll({
        attributes: ['id', 'name', 'surname', 'phone', 'ski', 'snowboard'],
        raw: true,
      });

      console.log('TRAINERS', trainers);

      return res.status(200).json({ trainers });
    } catch (err) {
      console.log('ERR !!!', err);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
