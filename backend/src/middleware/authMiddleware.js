// src/middleware/authMiddleware.js
const isAuthenticated = (req, res, next) => {
  // Verificamos si existe información del usuario en la sesión
  if (req.session && req.session.usuario) {
    return next(); // Si está autenticado, continuamos a la siguiente función (el controlador)
  } else {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Por favor, inicie sesión.' });
  }
};

module.exports = { isAuthenticated };