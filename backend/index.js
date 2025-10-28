// --- Importación de Módulos ---
const express = require("express"); // Framework web para Node.js
const cors = require("cors"); // Middleware para habilitar Cross-Origin Resource Sharing (permite peticiones desde el frontend)
const session = require("express-session"); // Middleware para gestionar sesiones de usuario

// Importación de los controladores que manejan la lógica de cada ruta
const libroController = require("./src/controllers/libroController");
const prestamoController = require("./src/controllers/prestamoController");
const estadisticasController = require("./src/controllers/estadisticasController");
const reporteController = require("./src/controllers/reporteController");
const multaController = require("./src/controllers/multaController");
const socioController = require("./src/controllers/socioController");
const authController = require("./src/controllers/authController");

// Importación del middleware de autenticación para proteger rutas
const { isAuthenticated } = require("./src/middleware/authMiddleware");

// --- Configuración Inicial de Express ---
const app = express(); // Crea la instancia de la aplicación Express
const PORT = process.env.PORT || 3001; // Define el puerto (usa el de Render o 3001 localmente)

// Lee la URL del frontend desde variables de entorno (para producción) o usa localhost (para desarrollo)
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// --- Configuración de Middlewares Globales ---

// Habilita CORS, permitiendo peticiones solo desde la URL del frontend
// 'credentials: true' es necesario para que las cookies de sesión se envíen/reciban
app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

// Habilita el parsing de JSON en el cuerpo de las peticiones (req.body)
app.use(express.json());

// Configura el middleware de gestión de sesiones
app.use(
  session({
    // Clave secreta para firmar la cookie de sesión (debe ser larga y aleatoria, idealmente desde variables de entorno)
    secret: process.env.SESSION_SECRET || "@zgBrrOWaSIiLV-BvcVTVzWMw%;N09kV;^4()CvewZekvudwA7",
    resave: false, // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: false, // No crear sesiones para usuarios no autenticados
    cookie: {
      secure: process.env.NODE_ENV === 'production', // 'secure: true' solo en producción (HTTPS)
      httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador (protección XSS)
      maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie (ej: 1 día en milisegundos)
      // 'sameSite' ayuda a prevenir ataques CSRF. 'none' es necesario para cross-site en prod (HTTPS), 'lax' es bueno para dev.
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
  })
);

// Configuración adicional necesaria si la app corre detrás de un proxy (como en Render)
// Ayuda a que 'secure: true' funcione correctamente con HTTPS.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Confía en la primera cabecera X-Forwarded-*
}

// --- Definición de Rutas ---

// --- A. Rutas Públicas (Autenticación) ---
// Estas rutas deben definirse ANTES de aplicar el middleware de autenticación.
app.post("/api/auth/login", authController.login); // Endpoint para iniciar sesión
app.post("/api/auth/logout", authController.logout); // Endpoint para cerrar sesión

// --- B. Middleware de Autenticación ---
// Se aplica a todas las rutas definidas DESPUÉS de esta línea que comiencen con '/api'.
app.use("/api", isAuthenticated);

// --- C. Rutas Protegidas ---
// Solo accesibles si el usuario ha iniciado sesión (gracias al middleware anterior).

// Rutas de Verificación y Reportes
app.get("/api/auth/status", authController.status); // Verifica si hay una sesión activa
app.get("/api/reportes/vencen-hoy", reporteController.getVencenHoy);
app.get("/api/reportes/ultimas-devoluciones", reporteController.getUltimasDevoluciones);
app.get("/api/estadisticas", estadisticasController.getEstadisticas);

// Rutas para Socios
app.get("/api/socios/ultimos", socioController.getUltimosSocios);
app.get("/api/socios", socioController.getSocios);
app.post("/api/socios", socioController.crearSocio);

// Rutas para Libros
app.get("/api/libros/ultimos", libroController.getUltimosLibros);
app.get("/api/libros", libroController.getLibros);
app.post("/api/libros", libroController.crearLibro);

// Rutas para Préstamos
app.get("/api/prestamos/vigentes", prestamoController.getPrestamosVigentes);
app.post("/api/prestamos", prestamoController.crearPrestamo);
app.patch("/api/prestamos/:id/devolver", prestamoController.registrarDevolucion); // :id es un parámetro en la URL

// Rutas para Multas
app.get("/api/multas", multaController.getMultas);
app.patch("/api/multas/:id/pagar", multaController.registrarPago); // :id es un parámetro en la URL

// --- Inicio del Servidor ---
// Solo inicia el servidor si este archivo es el punto de entrada principal
// (evita que se inicie al ser importado por las pruebas).
if (require.main === module) { // Esta condición es true cuando ejecutás `node index.js`
  app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
  });
}

// --- Exportación de la App (para Pruebas) ---
// Exporta la instancia de Express para que pueda ser usada por Supertest.
module.exports = app;