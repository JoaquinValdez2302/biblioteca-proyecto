const pool = require('../config/database');


// La función ahora acepta parámetros de búsqueda y paginación
const obtenerTodos = async (busqueda = '', pagina = 1, porPagina = 10) => {
  // Calculamos el OFFSET para la paginación
  const offset = (pagina - 1) * porPagina;

  // Construimos la consulta SQL dinámicamente
  let consulta = 'SELECT * FROM Libro';
  const valores = [];

  if (busqueda) {
    // Usamos ILIKE para búsquedas insensibles a mayúsculas/minúsculas
    consulta += ' WHERE titulo ILIKE $1 OR autor ILIKE $1';
    valores.push(`%${busqueda}%`);
  }

  // Agregamos la paginación a la consulta
  consulta += ` LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`;
  valores.push(porPagina, offset);

  const resultado = await pool.query(consulta, valores);
  return resultado.rows;
};

const obtenerUltimosAgregados = async (limite = 5) => {
  const consulta = `
    SELECT libro_id, titulo, autor 
    FROM Libro 
    ORDER BY libro_id DESC 
    LIMIT $1`;
  const resultado = await pool.query(consulta, [limite]);
  return resultado.rows;
};

const crear = async (titulo, autor, isbn, precio) => {
  const consulta = 'INSERT INTO Libro (titulo, autor, isbn, precio) VALUES ($1, $2, $3, $4) RETURNING *';
  const resultado = await pool.query(consulta, [titulo, autor, isbn, precio]);
  return resultado.rows[0];
};

// --- NUEVAS FUNCIONES ---
const obtenerPorId = async (id) => {
  const resultado = await pool.query('SELECT * FROM Libro WHERE libro_id = $1', [id]);
  return resultado.rows[0];
};

const actualizarEstado = async (id, estado) => {
  await pool.query('UPDATE Libro SET estado = $1 WHERE libro_id = $2', [estado, id]);
};
// -------------------------

module.exports = {
  obtenerTodos,
  obtenerPorId,     // Exportamos las nuevas funciones
  actualizarEstado,
  crear,
  obtenerUltimosAgregados,
};