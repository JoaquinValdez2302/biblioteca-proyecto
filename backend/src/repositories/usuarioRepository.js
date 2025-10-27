// src/repositories/usuarioRepository.js
const pool = require("../config/database");

const obtenerPorNombreUsuario = async (nombreUsuario) => {
  const consulta = "SELECT * FROM Usuario WHERE nombre_usuario = $1";
  const resultado = await pool.query(consulta, [nombreUsuario]);
  return resultado.rows[0]; // Devuelve el usuario o undefined
};

module.exports = { obtenerPorNombreUsuario };
