const pool = require('../config/database');

const crear = async (socioId, motivo, monto) => {
  // Añadimos un try...catch para capturar cualquier error de la base de datos
  try {
    const consulta = 'INSERT INTO Multa (socio_id, motivo, monto) VALUES ($1, $2, $3) RETURNING *';
    const valores = [socioId, motivo, monto];
    const resultado = await pool.query(consulta, valores);
    console.log('✅ Multa guardada en la base de datos con éxito.'); // Mensaje de confirmación
    return resultado.rows[0];
  } catch (error) {
    console.error('❌ ERROR AL GUARDAR LA MULTA EN LA BASE DE DATOS:', error);
    // Lanzamos el error para que las capas superiores sepan que algo salió mal
    throw error;
  }
};

// --- NUEVAS FUNCIONES ---
const obtenerMultas = async (filtroNombre = '', filtroEstado = 'pendiente') => {
let consulta = `
    SELECT m.multa_id, m.monto, m.motivo, m.fecha_emision, m.estado, s.nombre_completo
    FROM Multa m
    JOIN Socio s ON m.socio_id = s.socio_id
    WHERE m.estado = $1
    `;
    const valores = [filtroEstado];

    if (filtroNombre) {
    consulta += ' AND s.nombre_completo ILIKE $2';
    valores.push(`%${filtroNombre}%`);
    }

    consulta += ' ORDER BY m.fecha_emision DESC';

    const resultado = await pool.query(consulta, valores);
    return resultado.rows;
};  

const actualizarEstado = async (multaId, nuevoEstado) => {
  const consulta = 'UPDATE Multa SET estado = $1 WHERE multa_id = $2 RETURNING *';
    const resultado = await pool.query(consulta, [nuevoEstado, multaId]);
    return resultado.rows[0];
};

module.exports = {
    crear,
    obtenerMultas,
    actualizarEstado,
};