const checkUserType = (userType) => {
  return (req, res, next) => {
    console.log(req.user.userType);
    if (req.user.userType !== userType) {
      return res.status(403).send({ message: 'You are not authorized to access this route' });
    } else {
      next();
    }
  };
};

module.exports = checkUserType;
