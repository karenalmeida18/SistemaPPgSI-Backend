const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { usp_code, password } = req.body;

    try {
      const user = await User.findOne({ where: { usp_code } });
      if (!user) return res.status(400).json({ msg: 'Incorrect code/password combination.' });

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ msg: 'Incorrect code/password combination.' });

      delete user.password;
      const token = sign({}, 'e0a1db94e47c5ce771c633ea2f2c0930', {
        subject: user.id.toString(),
        expiresIn: '1d',
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

};
