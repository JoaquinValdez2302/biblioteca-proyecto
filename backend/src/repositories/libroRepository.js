

const pool = require("../config/database");


 // Obtiene una lista paginada y filtrada de todos los libros.
 
const obtenerTodos = async (busqueda = "", pagina = 1, porPagina = 10) => {
  // Calcula el desplazamiento para la paginación.
  const offset = (pagina - 1) * porPagina;
  let filtroBusqueda = "";
  const valoresLibros = [];
  let contadorParamsLibros = 1;

  if (busqueda) {
    // Construye el filtro de búsqueda si se proporciona un término.
    filtroBusqueda = ` WHERE titulo ILIKE $${contadorParamsLibros} OR autor ILIKE $${contadorParamsLibros}`;
    valoresLibros.push(`%${busqueda}%`);
    contadorParamsLibros++;
  }

  // Consulta para obtener la lista de libros con paginación.
  const consultaLibros = `
    SELECT * FROM Libro 
    ${filtroBusqueda}
    ORDER BY titulo 
    LIMIT $${contadorParamsLibros} OFFSET $${contadorParamsLibros + 1}`;
  valoresLibros.push(porPagina, offset);

  // Consulta para contar el total de libros que coinciden con el filtro.
  const consultaConteo = `SELECT COUNT(*) FROM Libro ${filtroBusqueda}`;
  const valoresConteo = busqueda ? [`%${busqueda}%`] : [];

  try {
    // Ejecuta ambas consultas en paralelo para mejorar la eficiencia.
    const [resultadoLibros, resultadoConteo] = await Promise.all([
      pool.query(consultaLibros, valoresLibros),
      pool.query(consultaConteo, valoresConteo),
    ]);

    const totalLibros = parseInt(resultadoConteo.rows[0].count, 10);

    // Devuelve un objeto con los libros de la página y el conteo total.
    return {
      libros: resultadoLibros.rows,
      total: totalLibros,
    };
  } catch (error) {
    console.error("Error en repositorio al obtener libros:", error);
    throw error;
  }
};


  //Obtiene los últimos libros agregados al sistema.
 
const obtenerUltimosAgregados = async (limite = 5) => {
  const consulta = `
    SELECT libro_id, titulo, autor 
    FROM Libro 
    ORDER BY libro_id DESC 
    LIMIT $1`;
  const resultado = await pool.query(consulta, [limite]);
  return resultado.rows;
};


// Crea un nuevo libro en la base de datos.

const crear = async (titulo, autor, isbn, precio) => {
  const consulta =
    "INSERT INTO Libro (titulo, autor, isbn, precio) VALUES ($1, $2, $3, $4) RETURNING *";
  const resultado = await pool.query(consulta, [titulo, autor, isbn, precio]);
  return resultado.rows[0];
};


// Busca un libro específico por su ID.

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM Libro WHERE libro_id = $1",
    [id]
  );
  return resultado.rows[0];
};


// Actualiza el estado de un libro (ej. 'disponible', 'prestado').

const actualizarEstado = async (id, estado) => {
  await pool.query("UPDATE Libro SET estado = $1 WHERE libro_id = $2", [
    estado,
    id,
  ]);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarEstado,
  crear,
  obtenerUltimosAgregados,
};
