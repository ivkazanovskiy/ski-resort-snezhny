const router = require('express').Router();
const { Op } = require('sequelize');
const { Room, Order } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { start: startWish, finish: finishWish, type: typeString } = req.headers;
    const typeId = Number(typeString);
    try {
      const allRooms = await Room.findAll({
        where: { typeId },
        raw: true,
        attributes: ['id'],
      });

      const ordered = await Order.findAll({
        where: {
          [Op.or]: [{
            [Op.and]: [{
              start: { [Op.lte]: startWish },
            }, {
              finish: { [Op.gt]: startWish },
            }],
          }, {
            [Op.and]: [{
              start: { [Op.lt]: finishWish },
            }, {
              finish: { [Op.gte]: finishWish },
            }],
          }],

        },
        attributes: ['roomId'],
        raw: true,
      });

      const allRoomsArray = allRooms.map((room) => room.id);
      const orderedArray = ordered.map((room) => room.roomId);
      const avaliableArray = allRoomsArray.filter((room) => !orderedArray.includes(room));

      return res.status(200).json(avaliableArray);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;