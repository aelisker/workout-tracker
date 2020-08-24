const jwt = require('jsonwebtoken');
require('dotenv').config();

// use .env file. Can set to string if testing locally but make sure to change back
// let secret = process.env.SERVER_SECRET;
const secret = 'mysecretsshhhhh';
const expiration = '4h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log("token", token)


    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
    catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
  }
};