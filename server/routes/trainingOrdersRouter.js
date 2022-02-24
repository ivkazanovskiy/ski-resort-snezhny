const router = require('express').Router();
const { TrainingOrder } = require('../db/models');
const { Trainer } = require('../db/models');
const { User } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { id } = req.user;

    if (req.user.role === 'user') {
      try {
        const orders = await TrainingOrder.findAll({
          where: { userId: id },
          attributes: ['id', 'start', 'duration', 'sport'],
          order: [['start', 'ASC']],
          include: {
            model: Trainer,
            attributes: ['id', 'name', 'surname', 'phone'],
          },
          raw: true,
        });

        console.log('ORSERS USER', orders);

        return res.status(200).json({ orders });
      } catch (err) {
        console.log('ERR USER', err);
        return res.status(500).json({ error: err.message });
      }
    } else if (req.user.role === 'trainer') {
      try {
        const orders = await TrainingOrder.findAll({
          where: { trainerId: id },
          attributes: ['id', 'start', 'duration', 'sport'],
          order: [['start', 'ASC']],
          include: {
            model: User,
            attributes: ['id', 'name', 'surname', 'phone'],
          },
          raw: true,
        });

        console.log('ORSERS TRAINER', orders);

        return res.status(200).json({ orders });
      } catch (err) {
        console.log('ERR TRAINER', err);
        return res.status(500).json({ error: err.message });
      }
    }
  });

module.exports = router;
