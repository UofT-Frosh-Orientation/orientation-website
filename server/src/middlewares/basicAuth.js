const basicAuth = (req, res, next) => {
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  const { authorization } = req.headers;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64')
    .toString()
    .split(':');

  if (
    !(
      secureCompare(username, process.env.BASIC_AUTH_USER) &&
      secureCompare(password, process.env.BASIC_AUTH_PASS)
    )
  ) {
    return reject();
  }

  next();
};

const secureCompare = (a, b) => {
  let areEqual = true;
  if (a.length !== b.length) {
    areEqual = false;
  }
  for (let i = 0; i < b.length; i++) {
    if (!(a.charAt(i) === b.charAt(i))) {
      areEqual = false;
    }
  }
  return areEqual;
};

module.exports = basicAuth;
