const Form = require('../models/Form');

module.exports = {
  async create(req, res) {
    const { user: { user_type } } = req;
    if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });

    try {
      const form = await Form.create();

      return res.status(200).json(form);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    try {
      const forms = await Form.findAll();
      if (forms.length === 0) return res.status(404).json({ msg: 'No forms found' });

      return res.status(200).json(forms);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async index(req, res) {
    const { id } = req.params;

    try {
      const form = await Form.findByPk(id);
      if (!form) return res.status(403).json({ msg: 'form not found' });

      return res.status(200).json(form);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
