const { verify } = require('jsonwebtoken');
const authJwt = require('../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token is missing' });

  const [, token] = authHeader.split(' ');

  try {
    const { sub, user_type } = verify(token, authJwt.secret);
    req.user = {
      id: sub,
      user_type,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
