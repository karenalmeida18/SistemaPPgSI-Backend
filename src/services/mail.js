const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = {
  async send(email, name) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'PPGSI-USP Avaliação',
      html: `Olá ${name} ! seu relatório já foi avaliado ! <br> Verifique a situação clicando <a href="https://ppgsi-usp.netlify.app/login"> Aqui </a>`,
    });
  },
};
