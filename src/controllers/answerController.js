const Answer = require('../models/Answer');
const Question = require('../models/Question');

module.exports = {
  async create(req, res) {
    const { answer } = req.body;
    const { id } = req.user;
    const { question_id } = req.params;
    // maybe check uspcode too
    try {
      const question = await Question.findByPk(question_id);
      if (!question) return res.status(400).json({ msg: 'question not found' });
      if (!answer) return res.status(400).json({ msg: 'missing the form answer' });

      const answerResponse = await Answer.create({ user_id: id, question_id, answer });
      return res.status(200).json(answerResponse);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async read(req, res) {
    const { question_id } = req.params;
    const { id } = req.user;
    try {
      const answers = await Answer.findAll({
        where: { question_id, user_id: id },
        include: [{
          association: 'users',
          attributes: ['name', 'usp_code'],
          required: false,
        }],
      });
      if (answers.length === 0) return res.status(400).json({ msg: 'answer not found' });
      return res.status(200).json(answers);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async createAnswers(req, res) {
    const { id } = req.user;
    const { answers } = req.body;
    try {
      const createdAnswers = [];
      const promiseAnswer = async ({ question_id, answer }) => {
        if (!answer) throw new Error('missing answer');

        const question = await Question.findByPk(question_id);
        if (!question) throw new Error('question not found');

        const createdAnswer = await Answer.create({ user_id: id, question_id, answer });
        createdAnswers.push(createdAnswer);
        return null;
      };

      const promises = [];
      answers.forEach(({ question_id, answer }) => {
        promises.push(promiseAnswer({ question_id, answer }));
      });

      await Promise.all(promises).then((values) => console.log(values))
        .catch(() => console.log(createdAnswers));

      return res.status(200).json('form answered successfully');
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

};
