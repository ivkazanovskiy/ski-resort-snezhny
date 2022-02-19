const router = require('express').Router();

router.route('/')
  .post((req, res) => {
    if (req.session.user) return res.json({ message: 'authorized' });
    res.json({ message: 'unAuthorized' });
  });

module.exports = router;
