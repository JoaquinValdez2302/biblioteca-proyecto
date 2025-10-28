/**
 * @fileoverview Controlador para manejar peticiones HTTP relacionadas con los libros.
 */

const bibliotecaFacade = require("../facades/bibliotecaFacade");

/**
 * Maneja GET /api/libros. Obtiene la lista de libros con filtros y paginación.
 */
const getLibros = async (req, res) => {
  try {
    const { busqueda, pagina } = req.query;
    // Delega la obtención de libros a la fachada.
    const resultado = await bibliotecaFacade.obtenerCatalogoDeLibros(
      busqueda,
      pagina
    );
    // Envía el resultado (objeto { libros, total }) como JSON.
    res.json(resultado);
  } catch (error) {
    console.error("Error en el controlador de libros:", error);
    res.status(500).send("Error en el servidor");
  }
};

/**
 * Maneja POST /api/libros. Crea un nuevo libro en el catálogo.
 */
const crearLibro = async (req, res) => {
  try {
    const { titulo, autor, isbn, precio } = req.body;
    // Validación básica de campos requeridos.
    if (!titulo || !autor || !isbn || precio === undefined) {
      return res.status(400).json({
        mensaje:
          "Todos los campos (título, autor, isbn, precio) son requeridos",
      });
    }

    // Delega la creación del libro a la fachada.
    const nuevoLibro = await bibliotecaFacade.agregarNuevoLibro(
      titulo,
      autor,
      isbn,
      precio
    );
    // Envía el libro creado con estado 201 (Creado).
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    // Manejo específico para error de ISBN duplicado (código PostgreSQL).
    if (error.code === "23505") {
      return res.status(409).json({ mensaje: "Error: El ISBN ya existe." }); // 409 Conflict
    }
    // Error genérico para otros fallos.
    res.status(500).json({
      mensaje: "Error interno del servidor al intentar crear el libro.",
    });
  }
};

/**
 * Maneja GET /api/libros/ultimos. Obtiene los últimos libros agregados.
 */
const getUltimosLibros = async (req, res) => {
  try {
    // Delega la obtención de los últimos libros a la fachada.
    const libros = await bibliotecaFacade.obtenerUltimosLibrosAgregados();
    // Envía la lista de libros como JSON.
    res.json(libros);
  } catch (error) {
    console.error("Error al obtener últimos libros:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Exporta las funciones para ser usadas en index.js
module.exports = {
  getLibros,
  crearLibro,
  getUltimosLibros,
};