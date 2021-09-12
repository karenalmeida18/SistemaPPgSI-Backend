const Evaluation = require('../models/Evaluation');

module.exports = {
  async create(req, res) {
    const {
      note_advisor, selfguard_advisor, note_ccp, selfguard_ccp,
    } = req.body;
    const { id } = req.user; // using id instead of uspcode
    const { user: { user_type } } = req;
    const { form_id } = req.params;

    try {
      if ((user_type === 'advisor')) {
        if (!note_advisor) return res.status(400).json({ msg: ' missing the note of the evaluation' });
        await Evaluation.create({
          note_advisor, selfguard_advisor, usp_code: id, form_id, note_ccp, selfguard_ccp,
        });
        return res.status(200).json({ msg: 'advisor evaluation successed' });
      }
      if ((user_type === 'ccp')) {
        if (!note_ccp) return res.status(400).json({ msg: ' missing the note of the evaluation' });
        // const exist_adv_evaluation = Evaluation.findOne({ where: {} });... check maybe later
        await Evaluation.create({
          note_advisor, selfguard_advisor, usp_code: id, form_id, note_ccp, selfguard_ccp,
        });
        return res.status(200).json({ msg: 'ccp evaluation successed' });
      }
      return res.status(400).json('forbidden');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
  async read(req, res) {
    const { form_id } = req.params;
    const { id } = req.user;

    try {
      const evaluation = await Evaluation.findOne({ where: { form_id, usp_code: id } });
      if (!evaluation) return res.status(400).json({ msg: 'evaluation not found' });
      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};
