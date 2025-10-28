

const bibliotecaFacade = require("../facades/bibliotecaFacade");

// Maneja la petición POST /api/socios para crear un nuevo socio.
const crearSocio = async (req, res) => {
  try {
    // Extrae los datos del socio del cuerpo de la petición.
    const { nombreCompleto, dni, email, telefono } = req.body;
    // Valida que los campos obligatorios estén presentes.
    if (!nombreCompleto || !dni) {
      return res.status(400).json({ mensaje: "Nombre y DNI son requeridos" });
    }
    // Delega la creación del socio a la fachada.
    const nuevoSocio = await bibliotecaFacade.registrarNuevoSocio(
      nombreCompleto,
      dni,
      email,
      telefono
    );
    // Envía el socio recién creado con un estado 201 (Creado).
    res.status(201).json(nuevoSocio);
  } catch (error) {
    console.error("Error al crear socio:", error);
    // Maneja cualquier error del servidor.
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// Maneja la petición GET /api/socios para obtener una lista paginada y filtrada.
const getSocios = async (req, res) => {
  try {
    // Lee los parámetros de búsqueda y paginación de la URL.
    const { busqueda, pagina } = req.query;
    // Delega la obtención de la lista a la fachada.
    const resultado = await bibliotecaFacade.obtenerListaDeSocios(busqueda, pagina);
    // Envía el resultado (objeto { socios, total }) al frontend.
    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener socios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Maneja la petición GET /api/socios/ultimos para obtener los socios más recientes.
const getUltimosSocios = async (req, res) => {
  try {
    // Delega la obtención de los últimos socios a la fachada.
    const socios = await bibliotecaFacade.obtenerUltimosSociosAgregados();
    // Envía la lista de socios como respuesta.
    res.json(socios);
  } catch (error) {
    console.error('Error al obtener últimos socios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
module.exports = { 
    crearSocio,
    getSocios,
    getUltimosSocios,
};
