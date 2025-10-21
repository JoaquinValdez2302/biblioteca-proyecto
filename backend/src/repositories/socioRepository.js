const pool = require('../config/database');

// Cambiamos la función para que busque por el número de socio
const obtenerPorNumeroDeSocio = async (numeroDeSocio) => {
  const resultado = await pool.query(
    'SELECT * FROM Socio WHERE numero_de_socio = $1',
    [numeroDeSocio]
  );
  return resultado.rows[0]; // Devuelve el socio encontrado o undefined
};

const actualizarSancion = async (socioId, fechaSancion) => {
  await pool.query('UPDATE Socio SET sancionado_hasta = $1 WHERE socio_id = $2', [fechaSancion, socioId]);
};

const crear = async (nombreCompleto, dni, email, telefono) => {
  const client = await pool.connect();
  console.log('Iniciando transacción para crear socio...'); // <-- LOG 1
  try {
    await client.query('BEGIN');

    const insertQuery = `
      INSERT INTO Socio (nombre_completo, dni, email, telefono) 
      VALUES ($1, $2, $3, $4) 
      RETURNING socio_id`;
    const insertValues = [nombreCompleto, dni, email, telefono];
    const insertResult = await client.query(insertQuery, insertValues);
    const nuevoSocioId = insertResult.rows[0].socio_id;
    console.log(`Socio insertado con ID: ${nuevoSocioId}`); // <-- LOG 2

    const numeroDeSocioGenerado = String(nuevoSocioId).padStart(6, '0');
    console.log(`Número de socio generado: ${numeroDeSocioGenerado}`); // <-- LOG 3

    const updateQuery = 'UPDATE Socio SET numero_de_socio = $1 WHERE socio_id = $2 RETURNING *';
    const updateValues = [numeroDeSocioGenerado, nuevoSocioId];
    console.log('Ejecutando UPDATE para asignar número de socio...'); // <-- LOG 4
    const updateResult = await client.query(updateQuery, updateValues);
    console.log('UPDATE ejecutado con éxito.'); // <-- LOG 5

    await client.query('COMMIT');
    console.log('COMMIT de la transacción realizado.'); // <-- LOG 6
    return updateResult.rows[0];
  } catch (error) {
    console.error('ERROR DENTRO DE LA TRANSACCIÓN:', error); // <-- LOG 7 (Error)
    await client.query('ROLLBACK');
    console.log('ROLLBACK de la transacción realizado.'); // <-- LOG 8 (Rollback)
    throw error;
  } finally {
    client.release();
    console.log('Conexión liberada.'); // <-- LOG 9
  }
};

module.exports = {
  obtenerPorNumeroDeSocio,
  actualizarSancion,
  crear,
};