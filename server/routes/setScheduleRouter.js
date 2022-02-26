const router = require('express').Router();
const { Op } = require('sequelize');
const { Schedule, User } = require('../db/models');

router.route('/')
  .put(async (req, res) => {
    const { id } = req.user;
    const { days } = req.body;
    if (!days) return res.sendStatus(400);
    console.log(days);
    // TODO: в будущем сделать более гибкое расписание
    const possibleTime = ['09'/* , '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22' */];

    try {
      const cancelledDays = await Schedule.findAll({
        where: {
          trainerId: id,
          date: { [Op.notIn]: days },
        },
      });

      if (cancelledDays.length > 0) {
        cancelledDays.forEach(async (day) => {
          await day.destroy();
        });
      }

      days.forEach(async (date) => {
        possibleTime.forEach(async (startTime) => {
          await Schedule.findOrCreate({
            where: {
              trainerId: id,
              date,
              startTime,
            },
          });
        });
      });

      const newSchedule = await Schedule.findAll({
        where: { trainerId: id },
        attributes: ['date', 'startTime', 'sport'],
        raw: true,
        include: {
          model: User,
          attributes: ['name', 'surname', 'phone'],
        },
      });

      return res.status(201).json({ schedule: newSchedule });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
