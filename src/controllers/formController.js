const Form = require('../models/Form');

module.exports = {
  async create(req, res) {
    const { name, enabled } = req.body;
    const { user: { user_type } } = req;
    if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });

    try {
      const form = await Form.create({ name, enabled });

      return res.status(200).json(form);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    try {
      const { user: { user_type } } = req;
      if (user_type !== 'ccp' || user_type !== 'advisor') return res.status(403).json({ msg: 'forbidden' });

      const forms = await Form.findAll();
      if (forms.length === 0) return res.status(404).json({ msg: 'No forms found' });

      return res.status(200).json(forms);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async readEnabled(req, res) {
    try {
      const form = await Form.findOne({ where: { enabled: true } });
      if (!form) return res.status(404).json({ msg: 'No forms found' });

      return res.status(200).json(form);
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

  async update(req, res) {
    const { form_id } = req.params;
    const { user_type } = req.user;
    const { enabled, name } = req.body;
    try {
      const formEnabled = await Form.findOne({ where: { enabled: true } });
      if (formEnabled && enabled === true) return res.status(400).json({ msg: 'there is already an enabled form' });

      if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });

      const form = await Form.findByPk(form_id);
      if (!form) return res.status(403).json({ msg: 'form not found' });

      form.update({ enabled, name });
      return res.status(200).json({ msg: 'form updated !' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async delete(req, res) {
    const { form_id } = req.params;
    const { user_type } = req.user;
    try {
      if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });
      const form = await Form.findByPk(form_id);
      if (!form) return res.status(403).json({ msg: 'form not found' });
      await form.destroy();
      return res.status(200).json({ msg: 'form deleted !' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
