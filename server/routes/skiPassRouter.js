const router = require('express').Router();
const { SkiPass } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const table = await SkiPass.findAll({
        raw: true,
        attributes: [
          'id',
          'amount',
          'type',
          'weekDayYoung',
          'weekDayOld',
          'weekEndYoung',
          'weekEndOld',
        ],
      });

      console.log(table);
      return res.status(200).json(table);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
    res.end();
  });

module.exports = router;
