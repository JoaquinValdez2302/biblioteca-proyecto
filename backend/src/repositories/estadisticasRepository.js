const pool = require('../config/database');

const obtenerEstadisticasClave = async () => {
  // Ejecuta todas las consultas de conteo al mismo tiempo
    const [totalLibrosRes, totalSociosRes, librosPrestadosRes, librosAtrasadosRes] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM Libro'),
    pool.query('SELECT COUNT(*) FROM Socio'),
    pool.query('SELECT COUNT(*) FROM Prestamo WHERE fecha_devolucion IS NULL'),
    pool.query('SELECT COUNT(*) FROM Prestamo WHERE fecha_devolucion IS NULL AND fecha_vencimiento < NOW()')
    ]);

  // Extrae el valor de cada resultado y lo devuelve en un objeto
    return {
    totalLibros: parseInt(totalLibrosRes.rows[0].count, 10),
    totalSocios: parseInt(totalSociosRes.rows[0].count, 10),
    librosPrestados: parseInt(librosPrestadosRes.rows[0].count, 10),
    librosAtrasados: parseInt(librosAtrasadosRes.rows[0].count, 10)
    };
};

module.exports = {
    obtenerEstadisticasClave,
};