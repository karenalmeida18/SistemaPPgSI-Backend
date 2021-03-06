const Form = require('../models/Form');
const Question = require('../models/Question');

module.exports = {
  async create(req, res) {
    const { user: { user_type } } = req;
    if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });

    const { form_id } = req.params;
    const { description } = req.body;

    try {
      const form = await Form.findByPk(form_id);
      if (!form) return res.status(403).json({ msg: 'form not found' });

      if (!description) res.status(400).json({ msg: 'missing description' });

      const question = await Question.create({ description, form_id });

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async index(req, res) {
    const { user: { user_type } } = req;
    if (user_type !== 'ccp' && user_type !== 'advisor') return res.status(403).json({ msg: 'forbidden' });
    const { form_id } = req.params;

    try {
      const form = await Form.findByPk(form_id);
      if (!form) return res.status(403).json({ msg: 'form not found' });

      const questions = await Question.findAll({
        where: { form_id },
        include: {
          association: 'answers',
          required: false,
        },
      });
      if (questions.length === 0) return res.status(404).json({ msg: 'No questions found' });

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async listByUserId(req, res) {
    const { user: { user_type } } = req;
    if (user_type !== 'ccp' && user_type !== 'advisor') return res.status(403).json({ msg: 'forbidden' });

    const { form_id, user_id } = req.params;

    try {
      const form = await Form.findByPk(form_id);
      if (!form) return res.status(403).json({ msg: 'form not found' });

      const questions = await Question.findAll({
        where: { form_id },
        include: {
          association: 'answers',
          where: { user_id },
          required: false,
        },
      });
      if (questions.length === 0) return res.status(404).json({ msg: 'No questions found' });

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async list(req, res) {
    try {
      const form = await Form.findOne({ where: { enabled: true } });
      const {
        id: form_id,
      } = form || {};
      if (!form_id) return res.status(404).json({ msg: 'No forms found' });

      const questions = await Question.findAll({
        where: { form_id },
      });
      if (questions.length === 0) return res.status(404).json({ msg: 'No questions found' });

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
  async update(req, res) {
    const { question_id } = req.params;
    const { description } = req.body;
    const { user: { user_type } } = req;
    try {
      if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });
      const question = await Question.findByPk(question_id);
      if (!question) res.status(404).json({ msg: 'Question not found' });
      question.update({ description });
      return res.status(200).json({ msg: 'question updated' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
  async delete(req, res) {
    const { question_id } = req.params;
    const { user_type } = req.user;
    try {
      if (user_type !== 'ccp') return res.status(403).json({ msg: 'forbidden' });
      const question = await Question.findByPk(question_id);
      if (!question) return res.status(403).json({ msg: 'question not found' });
      await question.destroy();
      return res.status(200).json({ msg: 'question deleted !' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
