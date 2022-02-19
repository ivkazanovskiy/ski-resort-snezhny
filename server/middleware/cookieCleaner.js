function cookieCleaner(req, res, next) {
  if (req.cookies.sessionId && !req.session.user) {
    res.clearCookie('sessionId');
  }
  next();
}

module.exports = cookieCleaner;
