const router = require('express').Router();
const { TrainingOrder } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const id = 1; /// !!!
    try {
      const orders = await TrainingOrder.findAll({
        where: { userId: id },
        raw: true,
      });

      console.log(orders);

      return res.status(200).json({ orders });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
