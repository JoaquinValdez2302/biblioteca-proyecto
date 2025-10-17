const pool = require('../config/database');

// Cambiamos la función para que busque por el número de socio
const obtenerPorNumeroDeSocio = async (numeroDeSocio) => {
    const resultado = await pool.query(
    'SELECT * FROM Socio WHERE numero_de_socio = $1',
    [numeroDeSocio]
    );
  return resultado.rows[0]; // Devuelve el socio encontrado o undefined
};

module.exports = { obtenerPorNumeroDeSocio };