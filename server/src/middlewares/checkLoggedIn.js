
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(403).send({message: "Please sign in to access this route!"})
  }
}

module.exports = checkLoggedIn;
