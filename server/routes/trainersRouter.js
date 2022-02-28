const router = require('express').Router();
const fileMiddleware = require('../middleware/uploadFile');
const { Trainer } = require('../db/models');
const { Schedule } = require('../db/models');

router.route('/:id')
  .post(fileMiddleware.single('photo'), async (req, res) => {
    const { id } = req.params;
    const filedata = req.file;
    console.log('REQ', req);
    console.log('NEW NAME', filedata);

    try {
      const trainer = await Trainer.findOne({
        where: { id },
      });
      // const prevPhoto = trainer.photo;
      await trainer.update({ photo: filedata.filename });
      trainer.save();
      return res.status(200).json({ photo: filedata.filename });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  });

router.route('/')
  .get(async (req, res) => {
    const { sport, bookingdate: date } = req.headers;
    try {
      let trainers;

      if (sport === 'ski') {
        trainers = await Trainer.findAll({
          where: { ski: true },
          attributes: ['id', 'name', 'surname'],
          include: {
            model: Schedule,
            where: { date },
            attributes: ['startTime', 'userId'],
          },
          raw: true,
        });
      } else if (sport === 'snowboard') {
        trainers = await Trainer.findAll({
          where: { snowboard: true },
          attributes: ['id', 'name', 'surname'],
          include: {
            model: Schedule,
            where: { date },
            attributes: ['startTime', 'userId'],
          },
          raw: true,
        });
      }
      return res.status(200).json({ trainers });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
