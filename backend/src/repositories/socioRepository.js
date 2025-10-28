

const pool = require("../config/database");

/**
 * Busca un socio por su número de socio.
 */
const obtenerPorNumeroDeSocio = async (numeroDeSocio) => {
  const resultado = await pool.query(
    "SELECT * FROM Socio WHERE numero_de_socio = $1",
    [numeroDeSocio]
  );
  return resultado.rows[0];
};

/**
 * Actualiza la fecha de suspensión de un socio.
 */
const actualizarSancion = async (socioId, fechaSancion) => {
  await pool.query(
    "UPDATE Socio SET sancionado_hasta = $1 WHERE socio_id = $2",
    [fechaSancion, socioId]
  );
};

/**
 * Obtiene una lista paginada y filtrada de todos los socios.
 */
const obtenerTodos = async (busqueda = '', pagina = 1, porPagina = 10) => {
  const offset = (pagina - 1) * porPagina;
  let filtroBusqueda = '';
  const valores = [];
  let contadorParams = 1; // Para llevar la cuenta de los $1, $2, etc.

  if (busqueda) {
    filtroBusqueda = `WHERE nombre_completo ILIKE $${contadorParams} OR numero_de_socio ILIKE $${contadorParams} OR dni ILIKE $${contadorParams}`;
    valores.push(`%${busqueda}%`);
    contadorParams++;
  }

  // Consulta para obtener los socios paginados
  const consultaSocios = `
    SELECT socio_id, numero_de_socio, nombre_completo, dni, email, telefono, sancionado_hasta 
    FROM Socio 
    ${filtroBusqueda}
    ORDER BY nombre_completo 
    LIMIT $${contadorParams} OFFSET $${contadorParams + 1}`;
  valores.push(porPagina, offset);

  // Consulta para contar el total de socios que coinciden con la búsqueda
  const consultaConteo = `SELECT COUNT(*) FROM Socio ${filtroBusqueda}`;
  // Usamos solo el valor de búsqueda para el conteo
  const valoresConteo = busqueda ? [`%${busqueda}%`] : [];

  // Ejecutamos ambas consultas
  const [resultadoSocios, resultadoConteo] = await Promise.all([
    pool.query(consultaSocios, valores),
    pool.query(consultaConteo, valoresConteo)
  ]);

  const totalSocios = parseInt(resultadoConteo.rows[0].count, 10);

  return {
    socios: resultadoSocios.rows,
    total: totalSocios,
  };
};

/**
 * Crea un nuevo socio y le asigna un número de socio único.
 */
const crear = async (nombreCompleto, dni, email, telefono) => {
  const client = await pool.connect();
  console.log("Iniciando transacción para crear socio..."); // <-- LOG 1
  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO Socio (nombre_completo, dni, email, telefono) 
      VALUES ($1, $2, $3, $4) 
      RETURNING socio_id`;
    const insertValues = [nombreCompleto, dni, email, telefono];
    const insertResult = await client.query(insertQuery, insertValues);
    const nuevoSocioId = insertResult.rows[0].socio_id;
    console.log(`Socio insertado con ID: ${nuevoSocioId}`); // <-- LOG 2

    const numeroDeSocioGenerado = String(nuevoSocioId).padStart(6, "0");
    console.log(`Número de socio generado: ${numeroDeSocioGenerado}`); // <-- LOG 3

    const updateQuery =
      "UPDATE Socio SET numero_de_socio = $1 WHERE socio_id = $2 RETURNING *";
    const updateValues = [numeroDeSocioGenerado, nuevoSocioId];
    console.log("Ejecutando UPDATE para asignar número de socio..."); // <-- LOG 4
    const updateResult = await client.query(updateQuery, updateValues);
    console.log("UPDATE ejecutado con éxito."); // <-- LOG 5

    await client.query("COMMIT");
    console.log("COMMIT de la transacción realizado."); // <-- LOG 6
    return updateResult.rows[0];
  } catch (error) {
    console.error("ERROR DENTRO DE LA TRANSACCIÓN:", error); // <-- LOG 7 (Error)
    await client.query("ROLLBACK");
    console.log("ROLLBACK de la transacción realizado."); // <-- LOG 8 (Rollback)
    throw error;
  } finally {
    client.release();
    console.log("Conexión liberada."); // <-- LOG 9
  }
};

/**
 * Obtiene los últimos socios registrados en el sistema.
 */
const obtenerUltimosAgregados = async (limite = 5) => {
  const consulta = `
    SELECT socio_id, nombre_completo, numero_de_socio 
    FROM Socio 
    ORDER BY socio_id DESC 
    LIMIT $1`;
  const resultado = await pool.query(consulta, [limite]);
  return resultado.rows;
};


module.exports = {
  obtenerPorNumeroDeSocio,
  actualizarSancion,
  crear,
  obtenerTodos,
  obtenerUltimosAgregados,
};
