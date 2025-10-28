/**
 * @fileoverview Servicio para la lógica de negocio de los socios.
 * Centraliza las operaciones de socios, delegando la interacción con la base de datos
 * al repositorio de socios.
 */

const socioRepository = require("../repositories/socioRepository");

/**
 * Registra un nuevo socio en el sistema.
 */
const registrarNuevoSocio = async (nombreCompleto, dni, email, telefono) => {
  return await socioRepository.crear(nombreCompleto, dni, email, telefono);
};

/**
 * Consulta la lista de socios con filtros y paginación.
 */
const consultarTodosLosSocios = async (busqueda, pagina) => {
  return await socioRepository.obtenerTodos(busqueda, pagina);
};

/**
 * Consulta los últimos socios agregados al sistema.
 */
const consultarUltimosSocios = async () => {
  return await socioRepository.obtenerUltimosAgregados();
};

module.exports = { 
    registrarNuevoSocio,
    consultarTodosLosSocios,
    consultarUltimosSocios, 
};
