const libroRepository = require('../repositories/libroRepository');
const socioRepository = require('../repositories/socioRepository');
const prestamoRepository = require('../repositories/prestamoRepository');

// La función ahora recibe numeroDeSocio en lugar de socioId
const realizarPrestamo = async (numeroDeSocio, libroId) => {
    const libro = await libroRepository.obtenerPorId(libroId);
    if (!libro || libro.estado !== 'disponible') {
    throw new Error('El libro no está disponible para préstamo.');
    }

    
  // Regla 2: Verificar que el socio existe usando su NÚMERO
    const socio = await socioRepository.obtenerPorNumeroDeSocio(numeroDeSocio);
    if (!socio) {
    throw new Error(`El socio con número '${numeroDeSocio}' no existe.`);
    }
  //calcular fecha de vencimiento
    const fechaVencimiento = new Date();
  fechaVencimiento.setDate(fechaVencimiento.getDate() + 15);

  // Al crear el préstamo, seguimos usando el ID interno (clave foránea)
    const nuevoPrestamo = await prestamoRepository.crear(socio.socio_id, libroId, fechaVencimiento);

    await libroRepository.actualizarEstado(libroId, 'prestado');

    return nuevoPrestamo;
};

const consultarVencenHoy = async () => {
  return await prestamoRepository.obtenerVencenHoy();
};

const consultarUltimasDevoluciones = async () => {
  return await prestamoRepository.obtenerUltimasDevoluciones();
};
const consultarPrestamosVigentes = async (soloAtrasados) => {
  return await prestamoRepository.obtenerVigentes(soloAtrasados);
};
module.exports = { 
  realizarPrestamo,
  consultarPrestamosVigentes,
  consultarVencenHoy,
  consultarUltimasDevoluciones,
};