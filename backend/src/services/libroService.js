const libroRepository = require('../repositories/libroRepository');

// La función ahora recibe los parámetros del controlador
const obtenerTodosLosLibros = async (busqueda, pagina) => {
  // Podrías añadir validaciones aquí, como asegurar que 'pagina' sea un número
  return await libroRepository.obtenerTodos(busqueda, pagina);
};

module.exports = {
  obtenerTodosLosLibros,
};