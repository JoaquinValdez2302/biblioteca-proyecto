// src/controllers/multaController.js

/**
 * @fileoverview Controlador para manejar peticiones HTTP relacionadas con las multas.
 */

const bibliotecaFacade = require('../facades/bibliotecaFacade');

/**
 * Maneja GET /api/multas. Obtiene la lista de multas con filtros opcionales.
 */
const getMultas = async (req, res) => {
  try {
    // Extrae los parámetros de filtro de la URL (ej: /api/multas?nombre=Juan&estado=pendiente)
    const { nombre, estado } = req.query;
    // Delega la obtención de multas a la fachada, pasando los filtros.
    const multas = await bibliotecaFacade.consultarMultas(nombre, estado);
    // Envía la lista de multas como JSON.
    res.json(multas);
  } catch (error) {
    // Registra el error detallado en la consola del servidor.
    console.error("Error al obtener multas:", error);
    // Envía una respuesta genérica de error 500 al cliente.
    res.status(500).json({ mensaje: "Error interno del servidor al obtener multas." });
  }
};

/**
 * Maneja PATCH /api/multas/:id/pagar. Marca una multa específica como pagada.
 */
const registrarPago = async (req, res) => {
  try {
    // Obtiene el ID de la multa desde los parámetros de la ruta (ej: /api/multas/10/pagar).
    const { id } = req.params;
    // Delega el registro del pago a la fachada.
    const multaPagada = await bibliotecaFacade.registrarPagoDeMulta(id);
    // Verifica si la multa se encontró y actualizó. Si no, devuelve 404.
    if (!multaPagada) {
      return res.status(404).json({ mensaje: "Multa no encontrada." }); // 404 Not Found
    }
    // Envía la multa actualizada como JSON.
    res.json(multaPagada);
  } catch (error) {
    // Registra el error detallado en la consola del servidor.
    console.error("Error al registrar el pago de la multa:", error);
    // Envía una respuesta genérica de error 500 al cliente.
    res.status(500).json({ mensaje: "Error interno del servidor al registrar el pago." });
  }
};

// Exporta las funciones para ser usadas en index.js
module.exports = { getMultas, registrarPago };