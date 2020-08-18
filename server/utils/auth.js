const jwt = require('jsonwebtoken');
require('dotenv').config();

<<<<<<< HEAD
// const secret = 'mysecretsshhhhh';
const secret = process.env.SERVER_SECRET;
=======
const secret = 'mysecretsshhhhh';
// const secret = process.env.SERVER_SECRET;
>>>>>>> 7d3b9dac1db48f7f490788aca4dc2da5810b79a4
const expiration = '2h';

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
<<<<<<< HEAD
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
=======
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
>>>>>>> 7d3b9dac1db48f7f490788aca4dc2da5810b79a4

    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
  }
};