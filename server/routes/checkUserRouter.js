const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (req.user) return res.sendStatus(200);
    res.sendStatus(403);
  });

module.exports = router;
