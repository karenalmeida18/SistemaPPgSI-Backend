const { hash } = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const {
      name, usp_code, user_type, password, email, lattes, lattes_date, advisor, course,
    } = req.body;

    try {
      if (!usp_code || !name || !password || !user_type || !email) return res.status(400).json({ msg: 'Missing fields' });

      const userExists = await User.findOne({ where: { usp_code } });
      if (userExists) return res.status(400).json({ msg: 'User already exist' });

      const passwordHash = await hash(password, 8);

      const user = await User.create({
        name,
        usp_code,
        password: passwordHash,
        user_type,
        email,
        lattes,
        lattes_date,
        advisor,
        course,
      });

      delete user.password;

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    try {
      const { user: { user_type } } = req;
      if ((user_type !== 'ccp') && (user_type !== 'advisor')) return res.status(403).json('forbidden');

      const allUser = await User.findAll();
      if (allUser.length === 0) return res.status(404).json({ msg: 'No users found' });
      return res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      if (!id) return res.status(400).json({ msg: 'Missing id' });

      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ msg: 'User not found' });

      await user.destroy();

      return res.status(200).json('user deleted');
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async info(req, res) {
    const { id } = req.user;
    try {
      const info = await User.findByPk(id, { attributes: ['usp_code', 'name', 'user_type', 'email', 'lattes', 'lattes_date', 'advisor', 'course'] });
      return res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async update(req, res) {
    const {
      name, email, lattes, lattes_date, advisor, course,
    } = req.body;
    const { id } = req.user;
    try {
      const info = await User.findByPk(id);
      info.update({
        name, email, lattes, lattes_date, advisor, course,
      });
      return res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
