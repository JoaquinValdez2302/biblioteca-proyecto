const bibliotecaFacade = require('../facades/bibliotecaFacade');

const crearSocio = async (req, res) => {
    try {
        const { nombreCompleto, dni, email, telefono } = req.body;
        if (!nombreCompleto || !dni) {
            return res.status(400).json({ mensaje: 'Nombre y DNI son requeridos' });
        }
        const nuevoSocio = await bibliotecaFacade.registrarNuevoSocio(nombreCompleto, dni, email, telefono);
        res.status(201).json(nuevoSocio);
    } catch (error) {
        console.error('Error al crear socio:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = { crearSocio };