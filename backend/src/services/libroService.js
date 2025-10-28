

const libroRepository = require('../repositories/libroRepository');

/**
 * Obtiene una lista paginada y filtrada de todos los libros.
 */
const obtenerTodosLosLibros = async (busqueda, pagina) => {
  // Podrías añadir validaciones aquí, como asegurar que 'pagina' sea un número.
  return await libroRepository.obtenerTodos(busqueda, pagina);
};

/**
 * Agrega un nuevo libro al sistema.
 */
const agregarNuevoLibro = async (titulo, autor, isbn, precio) => {
  // Podrías validar aquí si el ISBN ya existe para evitar duplicados.
  return await libroRepository.crear(titulo, autor, isbn, precio);
};

/**
 * Consulta los últimos libros que fueron agregados al sistema.
 */
const consultarUltimosLibros = async () => {
  return await libroRepository.obtenerUltimosAgregados();
};

module.exports = {
  obtenerTodosLosLibros,
  agregarNuevoLibro,
  consultarUltimosLibros,
};