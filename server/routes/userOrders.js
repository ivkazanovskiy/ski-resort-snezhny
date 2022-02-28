const router = require('express').Router();
const { Order } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    try {
      const allOrders = await Order.findAll({
        where: { userId },
        order: [['roomId', 'ASC'], ['start', 'ASC']],
        attributes: ['id', 'start', 'roomId'],
        raw: true,
      });

      if (!allOrders) return res.sendStatus(404);

      return res.status(200).json(allOrders);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;