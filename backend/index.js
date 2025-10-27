const express = require("express");
const cors = require("cors");
const session = require("express-session");
const libroController = require("./src/controllers/libroController"); // Importamos el controlador
const prestamoController = require("./src/controllers/prestamoController");
const app = express();
const PORT = process.env.PORT || 3001;
const estadisticasController = require("./src/controllers/estadisticasController");
const reporteController = require("./src/controllers/reporteController");
const multaController = require("./src/controllers/multaController");
const socioController = require("./src/controllers/socioController");
const authController = require("./src/controllers/authController"); // Importar authController
const { isAuthenticated } = require("./src/middleware/authMiddleware"); // Importar middleware

app.use(
  cors({
    origin: "http://localhost:3000", // URL de tu frontend
    credentials: true, // <-- MUY IMPORTANTE para que las cookies de sesión funcionen
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "@zgBrrOWaSIiLV-BvcVTVzWMw%;N09kV;^4()CvewZekvudwA7", // Cambiá esto por una cadena aleatoria larga
    resave: false,
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: {
      secure: process.env.NODE_ENV === 'production' , // Poner true si usás HTTPS
      httpOnly: true, // Protege contra ataques XSS
      maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie (ej: 1 día)
    },
  })
);

// Definimos la ruta de la API y le decimos que use la función del controlador
app.post("/api/auth/login", authController.login);
app.post("/api/auth/logout", authController.logout);
app.use("/api", isAuthenticated); // Todas las rutas que empiecen con /api estarán protegidas
app.get("/api/auth/status", authController.status);
app.get("/api/socios/ultimos", socioController.getUltimosSocios);
app.get("/api/libros/ultimos", libroController.getUltimosLibros);
app.get("/api/socios", socioController.getSocios);
app.get("/api/libros", libroController.getLibros);
app.get("/api/prestamos/vigentes", prestamoController.getPrestamosVigentes);
app.get("/api/estadisticas", estadisticasController.getEstadisticas);
app.get("/api/reportes/vencen-hoy", reporteController.getVencenHoy);
app.get(
  "/api/reportes/ultimas-devoluciones",
  reporteController.getUltimasDevoluciones
);
app.get("/api/multas", multaController.getMultas);
app.post("/api/socios", socioController.crearSocio);
app.post("/api/prestamos", prestamoController.crearPrestamo);
app.post("/api/libros", libroController.crearLibro);
app.patch("/api/multas/:id/pagar", multaController.registrarPago);
app.patch(
  "/api/prestamos/:id/devolver",
  prestamoController.registrarDevolucion
);

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
