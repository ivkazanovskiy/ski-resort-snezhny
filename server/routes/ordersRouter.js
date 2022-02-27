const router = require('express').Router();
const { Order } = require('../db/models');
const { Room } = require('../db/models');
const { Type } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { date } = req.headers;

    try {
      const orders = await Order.findAll({
        where: {
          start: date,
        },
        attributes: ['id', 'start', 'roomId', 'userId'],
        include: {
          model: Room,
          attributes: ['id'],
          include: {
            model: Type,
            attributes: ['id', 'form', 'title'],
          },
        },
        raw: true,
      });

      console.log(orders);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
