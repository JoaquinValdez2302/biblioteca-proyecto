const libroRepository = require('../repositories/libroRepository');
const socioRepository = require('../repositories/socioRepository');
const prestamoRepository = require('../repositories/prestamoRepository');
const estrategiaSuspension = require('../strategies/estrategiaSuspensionPorAtraso');
const estrategiaMulta = require('../strategies/estrategiaMultaPorDeterioro');


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

const procesarDevolucion = async (prestamoId, estaDañado, nivelDeDaño) => {
  const prestamo = await prestamoRepository.obtenerPorId(prestamoId);
  if (!prestamo || prestamo.fecha_devolucion) {
    throw new Error('Este préstamo no es válido o ya fue devuelto.');
  }

  const libro = await libroRepository.obtenerPorId(prestamo.libro_id);
  const sancionesAplicadas = [];

  // 2. Aplicar la estrategia de suspensión si hay atraso
  // La estrategia internamente verifica si realmente hay días de atraso
  const sancionPorAtraso = await estrategiaSuspension.aplicar(prestamo);
  if (sancionPorAtraso) {
    sancionesAplicadas.push(sancionPorAtraso);
  }

  // 3. Aplicar la estrategia de multa si el libro está dañado
  if (estaDañado) {
    const sancionPorDaño = await estrategiaMulta.aplicar(prestamo, { nivelDeDaño, libro });
    sancionesAplicadas.push(sancionPorDaño);
  }

  // Lógica de devolución principal
  await libroRepository.actualizarEstado(prestamo.libro_id, 'disponible');
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