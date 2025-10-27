const bibliotecaFacade = require("../facades/bibliotecaFacade");

const crearSocio = async (req, res) => {
  try {
    const { nombreCompleto, dni, email, telefono } = req.body;
    if (!nombreCompleto || !dni) {
      return res.status(400).json({ mensaje: "Nombre y DNI son requeridos" });
    }
    const nuevoSocio = await bibliotecaFacade.registrarNuevoSocio(
      nombreCompleto,
      dni,
      email,
      telefono
    );
    res.status(201).json(nuevoSocio);
  } catch (error) {
    console.error("Error al crear socio:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const getSocios = async (req, res) => {
  try {
    const { busqueda, pagina } = req.query; // Leer parámetros de la URL
    // Recibe el objeto { socios, total } de la fachada
    const resultado = await bibliotecaFacade.obtenerListaDeSocios(busqueda, pagina);
    res.json(resultado); // Enviar el objeto completo al frontend
  } catch (error) {
    console.error('Error al obtener socios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getUltimosSocios = async (req, res) => {
  try {
    const socios = await bibliotecaFacade.obtenerUltimosSociosAgregados();
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
