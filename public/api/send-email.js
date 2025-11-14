const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { to, subject, html, from = process.env.EMAIL_USER } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Dave Macken Ilutronic soluciones" <${from}>`,
      to,
      subject,
      html
    });

    res.status(200).json({ success: true, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
