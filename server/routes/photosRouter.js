const router = require('express').Router();
const fs = require('fs');
const {
  middlewareHotel,
  middlewareComfortCottage,
  middlewareStandartCottage,
  middlewareComfortRoom,
  middlewareStandartRoom,
} = require('../middleware/uploadFile');

router.route('/1/new')
  .post(middlewareStandartRoom.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  });

router.route('/2/new')
  .post(middlewareComfortRoom.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  });

router.route('/3/new')
  .post(middlewareStandartCottage.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  });

router.route('/4/new')
  .post(middlewareComfortCottage.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  });

router.route('/5/new')
  .post(middlewareHotel.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  });

router.route('/')
  .get(async (req, res) => {
    const { folder } = req.headers;
    fs.readdir(`src${folder}`, (err, photos) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ photos });
    });
  });

module.exports = router;
