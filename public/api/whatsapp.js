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
    const { phone, message } = req.body;
    
    // Validar que el phone tenga 10 dígitos
    if (!phone || phone.length !== 10) {
      return res.status(400).json({ error: 'Número de teléfono inválido' });
    }

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
    
    res.status(200).json({ 
      success: true, 
      whatsapp_url: whatsappUrl,
      message: "URL de WhatsApp generada correctamente" 
    });
  } catch (error) {
    console.error('Error en API WhatsApp:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
