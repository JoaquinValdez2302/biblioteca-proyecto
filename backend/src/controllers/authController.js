// src/controllers/authController.js
const bibliotecaFacade = require("../facades/bibliotecaFacade");

const status = (req, res) => {
  // Si el middleware isAuthenticated pasó, significa que hay sesión
  if (req.session && req.session.usuario) {
    res.status(200).json({ usuario: req.session.usuario });
  } else {
    // Esto no debería pasar si isAuthenticated está bien aplicado, pero por seguridad
    res.status(401).json({ mensaje: "No autenticado" });
  }
};

const login = async (req, res) => {
  console.log('--- Petición POST a /api/auth/login recibida ---');
  const { nombreUsuario, contraseña } = req.body;
  try {
    const usuario = await bibliotecaFacade.autenticarUsuario(
      nombreUsuario,
      contraseña
    );
    if (usuario) {
      // Guardamos la información del usuario en la sesión
      req.session.usuario = usuario;
      res.status(200).json({ mensaje: "Login exitoso", usuario: usuario });
    } else {
      res.status(401).json({ mensaje: "Credenciales inválidas" }); // 401 Unauthorized
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const logout = (req, res) => {
  // Destruimos la sesión
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al cerrar sesión" });
    }
    // Limpiamos la cookie en el navegador
    res.clearCookie("connect.sid"); // 'connect.sid' es el nombre por defecto de la cookie de sesión
    res.status(200).json({ mensaje: "Logout exitoso" });
  });
};

module.exports = { login, logout, status };
