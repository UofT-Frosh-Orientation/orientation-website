const checkUserType = (userType) => {
  return (req, res, next) => {
    if (req.user.userType !== userType || req.user.approved === false) {
      return res.status(403).send({ message: 'You are not authorized to access this route' });
    } else {
      next();
    }
  };
};

module.exports = checkUserType;
