module.exports = async (req, res) => {
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
    const { name, phone, email, message } = req.body;

    // Aquí procesas el contacto - puedes guardar en base de datos o enviar notificaciones
    console.log('Nuevo contacto:', { name, phone, email, message });

    res.status(200).json({ 
      success: true, 
      message: "Contacto recibido correctamente" 
    });
  } catch (error) {
    console.error('Error en API contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
