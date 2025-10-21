const express = require('express');
const cors = require('cors');
const libroController = require('./src/controllers/libroController'); // Importamos el controlador
const prestamoController = require('./src/controllers/prestamoController'); 
const app = express();
const PORT = process.env.PORT || 3001;
const estadisticasController = require('./src/controllers/estadisticasController');
const reporteController = require('./src/controllers/reporteController');
const multaController = require('./src/controllers/multaController');
const socioController = require('./src/controllers/socioController');


app.use(cors());
app.use(express.json());
// Definimos la ruta de la API y le decimos que use la función del controlador
app.get('/api/libros', libroController.getLibros);
app.get('/api/prestamos/vigentes', prestamoController.getPrestamosVigentes);
app.get('/api/estadisticas', estadisticasController.getEstadisticas);
app.get('/api/reportes/vencen-hoy', reporteController.getVencenHoy);
app.get('/api/reportes/ultimas-devoluciones', reporteController.getUltimasDevoluciones);
app.patch('/api/prestamos/:id/devolver', prestamoController.registrarDevolucion);
app.get('/api/multas', multaController.getMultas);
app.patch('/api/multas/:id/pagar', multaController.registrarPago);
app.post('/api/socios', socioController.crearSocio);
app.post('/api/prestamos', prestamoController.crearPrestamo);
app.post('/api/libros', libroController.crearLibro);



app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});