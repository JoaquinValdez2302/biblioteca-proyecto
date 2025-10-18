const express = require('express');
const cors = require('cors');
const libroController = require('./src/controllers/libroController'); // Importamos el controlador
const prestamoController = require('./src/controllers/prestamoController'); 
const app = express();
const PORT = process.env.PORT || 3001;
const estadisticasController = require('./src/controllers/estadisticasController');
const reporteController = require('./src/controllers/reporteController');



app.use(cors());
app.use(express.json());
// Definimos la ruta de la API y le decimos que use la función del controlador
app.get('/api/libros', libroController.getLibros);
app.get('/api/prestamos/vigentes', prestamoController.getPrestamosVigentes);
app.post('/api/prestamos', prestamoController.crearPrestamo);
app.get('/api/estadisticas', estadisticasController.getEstadisticas);
app.get('/api/reportes/vencen-hoy', reporteController.getVencenHoy);
app.get('/api/reportes/ultimas-devoluciones', reporteController.getUltimasDevoluciones);


app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});