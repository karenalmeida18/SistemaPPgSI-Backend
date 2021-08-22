const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const {
      name, usp_code, user_type, password,
    } = req.body;

    try {
      const user = await User.create({
        name, usp_code, password, user_type,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: 'CREATE ERROR' });
    }
  },

  async read(req, res) {
    try {
      const allUser = await User.findAll();
      if (allUser.length === 0) return res.status(404).json({ msg: 'NO USER FOUND' });
      return res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json({ msg: 'GET ALL ERROR' });
    }
  },
};
