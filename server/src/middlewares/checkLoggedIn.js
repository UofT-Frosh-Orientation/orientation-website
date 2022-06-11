const baseUrl = process.env.CLIENT_BASE_URL;

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect(`${baseUrl}/login`)
  }
}

module.exports = checkLoggedIn;
