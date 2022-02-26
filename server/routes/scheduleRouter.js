const router = require('express').Router();
const { Op } = require('sequelize');
const { Schedule } = require('../db/models');
const { Trainer } = require('../db/models');
const { User } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { id } = req.user;

    if (req.user.role === 'user') {
      try {
        const orders = await Schedule.findAll({
          where: { userId: id },
          attributes: ['date', 'startTime', 'sport'],
          order: [['date', 'ASC'], ['startTime', 'ASC']],
          include: {
            model: Trainer,
            attributes: ['id', 'name', 'surname', 'phone'],
          },
          raw: true,
        });

        console.log('SCHEDULE USER', orders);

        return res.status(200).json({ orders });
      } catch (err) {
        console.log('ERR USER', err);
        return res.status(500).json({ error: err.message });
      }
    } else if (req.user.role === 'trainer') {
      try {
        const orders = await Schedule.findAll({
          where: {
            trainerId: id,
            userId: {
              [Op.ne]: null,
            },
          },
          attributes: ['date', 'startTime', 'sport'],
          order: [['date', 'ASC'], ['startTime', 'ASC']],
          include: {
            model: User,
            attributes: ['id', 'name', 'surname', 'phone'],
          },
          raw: true,
        });

        console.log('SCHEDULE TRAINER', orders);

        return res.status(200).json({ orders });
      } catch (err) {
        console.log('ERR TRAINER', err);
        return res.status(500).json({ error: err.message });
      }
    }
  })
  .post(async (req, res) => {
    const { id: userId } = req.user;
    const {
      trainerId,
      date,
      sport,
      hours,
    } = req.body;

    hours.forEach(async (startTime) => {
      try {
        const currentSchedule = await Schedule.findOne({
          where: {
            trainerId,
            date,
            startTime,
          },
        });

        await currentSchedule.update({
          sport,
          userId,
          updatedAt: new Date(),
        });
        await currentSchedule.save();

        // FIXME: разобраться со статусами ответов
        res.sendStatus(200);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });

module.exports = router;
