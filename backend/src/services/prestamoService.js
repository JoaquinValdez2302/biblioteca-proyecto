


const libroRepository = require('../repositories/libroRepository');
const socioRepository = require('../repositories/socioRepository');
const prestamoRepository = require('../repositories/prestamoRepository');
const estrategiaSuspension = require('../strategies/estrategiaSuspensionPorAtraso');
const estrategiaMulta = require('../strategies/estrategiaMultaPorDeterioro');

// Gestiona la creación de un nuevo préstamo, validando la disponibilidad del libro y la existencia del socio.
const realizarPrestamo = async (numeroDeSocio, libroId) => {
    const libro = await libroRepository.obtenerPorId(libroId);
    // Verifica si el libro existe y está disponible.
    if (!libro || libro.estado !== 'disponible') {
    throw new Error('El libro no está disponible para préstamo.');
    }

    const socio = await socioRepository.obtenerPorNumeroDeSocio(numeroDeSocio);
    // Verifica si el socio existe.
    if (!socio) {
    throw new Error(`El socio con número '${numeroDeSocio}' no existe.`);
    }

    const fechaVencimiento = new Date();
    // Calcula la fecha de vencimiento (15 días a partir de hoy).
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 15);

    // Crea el registro del préstamo en la base de datos.
    const nuevoPrestamo = await prestamoRepository.crear(socio.socio_id, libroId, fechaVencimiento);

    // Actualiza el estado del libro a 'prestado'.
    await libroRepository.actualizarEstado(libroId, 'prestado');

    return nuevoPrestamo;
};


// Consulta los préstamos que vencen el día de hoy.
const consultarVencenHoy = async () => {
  return await prestamoRepository.obtenerVencenHoy();
};


// Consulta las últimas devoluciones registradas.
const consultarUltimasDevoluciones = async () => {
  return await prestamoRepository.obtenerUltimasDevoluciones();
};


// Consulta los préstamos vigentes, con opción de filtrar solo los atrasados.
const consultarPrestamosVigentes = async (soloAtrasados) => {
  return await prestamoRepository.obtenerVigentes(soloAtrasados);
};

// Procesa la devolución de un libro, aplicando sanciones por atraso o daño si corresponde.
const procesarDevolucion = async (prestamoId, estaDañado, nivelDeDaño) => {
  const prestamo = await prestamoRepository.obtenerPorId(prestamoId);
  // Verifica si el préstamo existe y no ha sido devuelto ya.
  if (!prestamo || prestamo.fecha_devolucion) {
    throw new Error('Este préstamo no es válido o ya fue devuelto.');
  }

  const libro = await libroRepository.obtenerPorId(prestamo.libro_id);
  const sancionesAplicadas = [];

  // Aplica la estrategia de suspensión por atraso si corresponde.
  const sancionPorAtraso = await estrategiaSuspension.aplicar(prestamo);
  if (sancionPorAtraso) {
    sancionesAplicadas.push(sancionPorAtraso);
  }

  // Aplica la estrategia de multa por daño si el libro está dañado.
  if (estaDañado) {
    const sancionPorDaño = await estrategiaMulta.aplicar(prestamo, { nivelDeDaño, libro });
    sancionesAplicadas.push(sancionPorDaño);
  }

  // Actualiza el estado del libro a 'disponible'.
  await libroRepository.actualizarEstado(prestamo.libro_id, 'disponible');
  // Registra la fecha de devolución en el préstamo.
  const devolucion = await prestamoRepository.registrarDevolucion(prestamoId);

  return { devolucion, sancionesAplicadas };
};


module.exports = { 
  realizarPrestamo,
  consultarPrestamosVigentes,
  consultarVencenHoy,
  consultarUltimasDevoluciones,
  procesarDevolucion,
};