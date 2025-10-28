//Controlador para manejar peticiones HTTP relacionadas con la autenticación.
// Gestiona el inicio de sesión, cierre de sesión y verificación de estado de la sesión.

const bibliotecaFacade = require("../facades/bibliotecaFacade");

// Verifica si existe una sesión de usuario activa.
const status = (req, res) => {
  // Si el middleware 'isAuthenticated' pasó, significa que hay una sesión válida.
  if (req.session && req.session.usuario) {
    // Devuelve los datos del usuario almacenados en la sesión.
    res.status(200).json({ usuario: req.session.usuario });
  } else {
    // Esta respuesta es un respaldo en caso de que la ruta no esté bien protegida.
    res.status(401).json({ mensaje: "No autenticado" });
  }
};

// Procesa la petición de inicio de sesión.
const login = async (req, res) => {
  console.log('--- Petición POST a /api/auth/login recibida ---');
  // Extrae las credenciales del cuerpo de la petición.
  const { nombreUsuario, contraseña } = req.body;
  try {
    // Delega la autenticación a la fachada.
    const usuario = await bibliotecaFacade.autenticarUsuario(
      nombreUsuario,
      contraseña
    );
    if (usuario) {
      // Si las credenciales son válidas, guarda la información del usuario en la sesión.
      req.session.usuario = usuario;
      res.status(200).json({ mensaje: "Login exitoso", usuario: usuario });
    } else {
      // Si las credenciales son inválidas, responde con un error de no autorizado.
      res.status(401).json({ mensaje: "Credenciales inválidas" }); // 401 Unauthorized
    }
  } catch (error) {
    console.error("Error en login:", error);
    // Maneja cualquier error inesperado del servidor.
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Procesa la petición de cierre de sesión.
const logout = (req, res) => {
  // Destruye la sesión en el servidor.
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al cerrar sesión" });
    }
    // Pide al navegador que elimine la cookie de sesión.
    res.clearCookie("connect.sid"); // 'connect.sid' es el nombre por defecto de la cookie de sesión
    res.status(200).json({ mensaje: "Logout exitoso" });
  });
};

module.exports = { login, logout, status };
