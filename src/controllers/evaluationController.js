const Evaluation = require('../models/Evaluation');
const SendEmail = require('../services/mail');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const {
      note_advisor, selfguard_advisor, note_ccp, selfguard_ccp, user_id,
    } = req.body;

    const { user: { user_type } } = req;
    const { form_id } = req.params;

    try {
      if (!user_id || !form_id) return res.status(400).json({ msg: ' missing fields' });
      const exist_adv_evaluation = await Evaluation.findOne({ where: { user_id, form_id } });
      if ((user_type === 'advisor')) {
        if (!note_advisor) return res.status(400).json({ msg: ' missing the note of the evaluation' });
        if (!exist_adv_evaluation) {
          await Evaluation.create({
            note_advisor, selfguard_advisor, user_id, form_id,
          });
          return res.status(200).json({ msg: 'advisor evaluation successed' });
        }
        await exist_adv_evaluation.update({ note_advisor, selfguard_advisor });
        const { email, name } = await User.findByPk(user_id);
        SendEmail.send(email, name);
        return res.status(200).json({ msg: 'advisor evaluation successed' });
      }
      if ((user_type === 'ccp')) {
        if (!note_ccp) return res.status(400).json({ msg: ' missing the note of the evaluation' });
        if (!exist_adv_evaluation) {
          await Evaluation.create({
            user_id, form_id, note_ccp, selfguard_ccp,
          });
          if (note_ccp && note_advisor) return SendEmail.send();
          return res.status(200).json({ msg: 'ccp evaluation successed' });
        }
        await exist_adv_evaluation.update({ note_ccp, selfguard_ccp });
        const { email, name } = await User.findByPk(user_id);
        SendEmail.send(email, name);
        return res.status(200).json({ msg: 'ccp evaluation successed' });
      }
      return res.status(403).json('forbidden');
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    const { form_id } = req.params;
    const { id } = req.user;

    try {
      const evaluation = await Evaluation.findAll({ where: { form_id, user_id: id } });
      if (!evaluation || evaluation.length === 0) return res.status(400).json({ msg: 'evaluation not found' });
      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async readById(req, res) {
    const { form_id, user_id } = req.params;

    try {
      if (!form_id || !user_id) return res.status(400).json({ msg: 'missing fields' });

      const evaluation = await Evaluation.findAll({ where: { form_id, user_id } });
      if (!evaluation || evaluation.length === 0) return res.status(400).json({ msg: 'evaluation not found' });
      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async list(req, res) {
    const { user: { user_type } } = req;
    if ((user_type !== 'ccp') && (user_type !== 'advisor')) return res.status(403).json('forbidden');

    const { form_id } = req.params;
    try {
      const evaluation = await Evaluation.findAll({
        where: { form_id },
        include: {
          association: 'users',
          attributes: ['name', 'usp_code'],
          required: false,
        },
      });
      if (!evaluation) return res.status(400).json({ msg: 'evaluation not found' });
      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
