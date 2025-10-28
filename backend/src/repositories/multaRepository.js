/**
 * @fileoverview Repositorio para la entidad Multa.
 * Gestiona todas las operaciones de base de datos para las multas.
 */

const pool = require('../config/database');

/**
 * Crea un nuevo registro de multa en la base de datos.
 */
const crear = async (socioId, motivo, monto) => {
  try {
    const consulta = 'INSERT INTO Multa (socio_id, motivo, monto) VALUES ($1, $2, $3) RETURNING *';
    const valores = [socioId, motivo, monto];
    const resultado = await pool.query(consulta, valores);
    return resultado.rows[0];
  } catch (error) {
    console.error('ERROR AL GUARDAR LA MULTA EN LA BASE DE DATOS:', error);
    throw error;
  }
};

/**
 * Obtiene una lista de multas, permitiendo filtrar por nombre de socio y estado.
 */
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

/**
 * Actualiza el estado de una multa específica
 */
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