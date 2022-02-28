const router = require('express').Router();
const fs = require('fs');

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
