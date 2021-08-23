const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const {
      name, usp_code, user_type, password,
    } = req.body;

    try {
      const userExists = await User.findOne({ where: { usp_code } });
      if (userExists) return res.status(400).json({ msg: 'User already exist' });

      const user = await User.create({
        name, usp_code, password, user_type,
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    try {
      const allUser = await User.findAll();
      if (allUser.length === 0) return res.status(404).json({ msg: 'No users found' });
      return res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
