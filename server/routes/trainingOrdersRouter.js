const router = require('express').Router();
const { TrainingOrder } = require('../db/models');
const { Trainer } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { id } = req.user; /// !!!
    try {
      const orders = await TrainingOrder.findAll({
        where: { userId: id },
        attributes: ['id', 'start', 'duration', 'sport'],
        order: [['start', 'ASC']],
        include: {
          model: Trainer,
          attributes: ['id', 'name', 'surname'],
        },
        raw: true,
      });

      console.log(orders);

      return res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
