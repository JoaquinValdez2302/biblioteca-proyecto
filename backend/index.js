const express = require('express');
const cors = require('cors');
const libroController = require('./src/controllers/libroController'); // Importamos el controlador
const prestamoController = require('./src/controllers/prestamoController'); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// Definimos la ruta de la API y le decimos que use la función del controlador
app.get('/api/libros', libroController.getLibros);
app.get('/api/prestamos/vigentes', prestamoController.getPrestamosVigentes);
app.post('/api/prestamos', prestamoController.crearPrestamo);

app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});