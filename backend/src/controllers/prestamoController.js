/**
 * @fileoverview Controlador para manejar las peticiones HTTP relacionadas con los préstamos.
 * Recibe las solicitudes del frontend, llama a la fachada para ejecutar la lógica de negocio
 * y envía la respuesta adecuada (éxito o error).
 */

const bibliotecaFacade = require('../facades/bibliotecaFacade');
// const prestamoService = require('../services/prestamoService'); // Ya no se necesita si todo pasa por la fachada

/**
 * Maneja la petición POST para crear un nuevo préstamo.
 */
const crearPrestamo = async (req, res) => {
  try {
    const { numeroDeSocio, libroId } = req.body;
    // Delega la creación del préstamo a la fachada.
    const nuevoPrestamo = await bibliotecaFacade.registrarNuevoPrestamo(numeroDeSocio, libroId);
    // Envía la respuesta con el préstamo creado y estado 201 (Creado).
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    // Si la fachada lanza un error (ej: libro no disponible), envía estado 400 (Bad Request).
    res.status(400).json({ mensaje: error.message });
  }
};

/**
 * Maneja la petición GET para obtener los préstamos vigentes.
 */
const getPrestamosVigentes = async (req, res) => {
  try {
    // Verifica si se solicitó filtrar solo los atrasados desde la URL (ej: /api/prestamos/vigentes?atrasados=true).
    const soloAtrasados = req.query.atrasados === 'true';
    // Llama a la fachada para obtener los préstamos 
    const prestamos = await bibliotecaFacade.consultarPrestamosVigentes(soloAtrasados); 
    // Envía la lista de préstamos como JSON.
    res.json(prestamos);
  } catch (error) {
    // Registra el error en la consola del servidor.
    console.error('Error al obtener préstamos vigentes:', error); 
    // Envía una respuesta genérica de error 500 (Internal Server Error).
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

/**
 * Maneja la petición PATCH para registrar la devolución de un préstamo.
 */
const registrarDevolucion = async (req, res) => {
  try {
    // Obtiene el ID del préstamo desde los parámetros de la ruta.
    const { id } = req.params;
    // Obtiene la información sobre el estado del libro desde el cuerpo de la petición.
    const { estaDañado, nivelDeDaño } = req.body;
    // Delega el procesamiento de la devolución a la fachada.
    const resultado = await bibliotecaFacade.procesarDevolucion(id, estaDañado, nivelDeDaño);
    // Envía la respuesta con el resultado y estado 200 (OK).
    res.status(200).json(resultado); 
  } catch (error) {
    // Registra el error en la consola del servidor.
    console.error('Error al registrar la devolución:', error);
    // Si la fachada lanza un error (ej: préstamo ya devuelto), envía estado 400 (Bad Request).
    res.status(400).json({ mensaje: error.message });
  }
};

// Exporta las funciones del controlador para que puedan ser usadas en index.js
module.exports = {
  crearPrestamo,
  getPrestamosVigentes,
  registrarDevolucion,
};