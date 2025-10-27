const socioRepository = require("../repositories/socioRepository");
const { faker } = require("@faker-js/faker"); // Para generar el número de socio

const registrarNuevoSocio = async (nombreCompleto, dni, email, telefono) => {
  // Ya no generamos el número aquí, el repositorio se encarga
  return await socioRepository.crear(nombreCompleto, dni, email, telefono);
};

const consultarTodosLosSocios = async (busqueda, pagina) => {
  // Devuelve el objeto completo { socios: [...], total: ... }
  return await socioRepository.obtenerTodos(busqueda, pagina);
};

const consultarUltimosSocios = async () => {
  return await socioRepository.obtenerUltimosAgregados();
};

module.exports = { 
    registrarNuevoSocio,
    consultarTodosLosSocios,
    consultarUltimosSocios, 
};
