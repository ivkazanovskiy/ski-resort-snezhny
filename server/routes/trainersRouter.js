const router = require('express').Router();
const fs = require('fs');
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
      const prevPhoto = trainer.photo;
      await trainer.update({ photo: filedata.filename });
      trainer.save();
      fs.unlink(`src/photos/${prevPhoto}`, (err) => {
        if (err) console.log(err);
        else console.log(`Файл ${prevPhoto} удален`);
      });
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
