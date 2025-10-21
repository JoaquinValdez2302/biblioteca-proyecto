const libroRepository = require('../repositories/libroRepository');

// La función ahora recibe los parámetros del controlador
const obtenerTodosLosLibros = async (busqueda, pagina) => {
  // Podrías añadir validaciones aquí, como asegurar que 'pagina' sea un número
  return await libroRepository.obtenerTodos(busqueda, pagina);
};

const agregarNuevoLibro = async (titulo, autor, isbn, precio) => {
  // Podrías validar aquí si el ISBN ya existe
  return await libroRepository.crear(titulo, autor, isbn, precio);
};

module.exports = {
  obtenerTodosLosLibros,
  agregarNuevoLibro,
};