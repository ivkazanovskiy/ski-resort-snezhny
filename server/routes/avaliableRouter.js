const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    const { start, finish } = req.headers;

    console.log(start, finish);
    res.end();
  });

module.exports = router;
