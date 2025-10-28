const pool = require("../config/database");

// La función ahora acepta parámetros de búsqueda y paginación
const obtenerTodos = async (busqueda = "", pagina = 1, porPagina = 10) => {
  const offset = (pagina - 1) * porPagina;
  let filtroBusqueda = "";
  const valoresLibros = []; // Array para los parámetros de la consulta de libros
  let contadorParamsLibros = 1;

  if (busqueda) {
    // Construye la parte WHERE de la consulta
    filtroBusqueda = ` WHERE titulo ILIKE $${contadorParamsLibros} OR autor ILIKE $${contadorParamsLibros}`;
    valoresLibros.push(`%${busqueda}%`);
    contadorParamsLibros++;
  }

  // Consulta para obtener los libros paginados
  const consultaLibros = `
    SELECT * FROM Libro 
    ${filtroBusqueda}
    ORDER BY titulo 
    LIMIT $${contadorParamsLibros} OFFSET $${contadorParamsLibros + 1}`;
  // Añade los parámetros de paginación al array de valores para libros
  valoresLibros.push(porPagina, offset);

  // Consulta SEPARADA para contar el total de libros que coinciden
  const consultaConteo = `SELECT COUNT(*) FROM Libro ${filtroBusqueda}`;
  // Usa solo el valor de búsqueda para el conteo (si existe)
  const valoresConteo = busqueda ? [`%${busqueda}%`] : [];

  try {
    // Ejecuta ambas consultas en paralelo para mayor eficiencia
    const [resultadoLibros, resultadoConteo] = await Promise.all([
      pool.query(consultaLibros, valoresLibros),
      pool.query(consultaConteo, valoresConteo),
    ]);

    const totalLibros = parseInt(resultadoConteo.rows[0].count, 10);

    // Devuelve el objeto estructurado
    return {
      libros: resultadoLibros.rows,
      total: totalLibros,
    };
  } catch (error) {
    console.error("Error en repositorio al obtener libros:", error);
    throw error; // Propaga el error para que las capas superiores lo manejen
  }
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
  const consulta =
    "INSERT INTO Libro (titulo, autor, isbn, precio) VALUES ($1, $2, $3, $4) RETURNING *";
  const resultado = await pool.query(consulta, [titulo, autor, isbn, precio]);
  return resultado.rows[0];
};

// --- NUEVAS FUNCIONES ---
const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM Libro WHERE libro_id = $1",
    [id]
  );
  return resultado.rows[0];
};

const actualizarEstado = async (id, estado) => {
  await pool.query("UPDATE Libro SET estado = $1 WHERE libro_id = $2", [
    estado,
    id,
  ]);
};
// -------------------------

module.exports = {
  obtenerTodos,
  obtenerPorId, // Exportamos las nuevas funciones
  actualizarEstado,
  crear,
  obtenerUltimosAgregados,
};
