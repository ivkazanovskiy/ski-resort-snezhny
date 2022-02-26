const router = require('express').Router();
const { Trainer } = require('../db/models');
const { Schedule } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { sport, bookingdate: date } = req.headers;

    try {
      let trainers;
      if (sport === 'ski') {
        trainers = await Trainer.findAll({
          where: {
            ski: true,
          },
          attributes: ['id', 'name', 'surname'],
          include: {
            model: Schedule,
            where: {
              date,
            },
            attributes: ['startTime'],
          },
          raw: true,
        });
      } else if (sport === 'snowboard') {
        trainers = await Trainer.findAll({
          where:
            { snowboard: true },
          attributes: ['id', 'name', 'surname'],
          include: {
            model: Schedule,
            where: {
              date,
            },
            attributes: ['startTime', 'userId'],
          },
          raw: true,
        });
      }

      console.log('TRAINERS', trainers);

      return res.status(200).json({ trainers });
    } catch (err) {
      console.log('ERR !!!', err);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
