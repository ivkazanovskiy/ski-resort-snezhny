const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('sessionId');
    res.json({ message: 'unAuthorized' });
  });

module.exports = router;
