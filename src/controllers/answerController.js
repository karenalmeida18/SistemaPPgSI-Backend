const Answer = require('../models/Answer');
const Question = require('../models/Question');

module.exports = {
  async create(req, res) {
    const { answer } = req.body;
    const { id } = req.user;
    console.log(id);
    const { question_id } = req.params;
    // maybe check uspcode too
    try {
      const question = await Question.findByPk(question_id);
      if (!question) return res.status(400).json({ msg: 'question not found' });
      if (!answer) return res.status(400).json({ msg: 'missing the form answer' });

      const answer1 = await Answer.create({ usp_code: id, question_id, answer });
      return res.status(200).json(answer1);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    const { question_id } = req.params;
    const { id } = req.user;
    try {
      const answers = await Answer.findAll({
        where: { question_id, usp_code: id },
        include: [{
          association: 'users',
          required: false,
        }],
      });
      if (answers.length === 0) return res.status(400).json({ msg: 'answer not found' });
      return res.status(200).json(answers);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

};
