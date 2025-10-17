const bibliotecaFacade = require('../facades/bibliotecaFacade');

const getLibros = async (req, res) => {
    try {
    const { busqueda, pagina } = req.query;
    // El controlador ahora solo habla con la fachada
    const libros = await bibliotecaFacade.obtenerCatalogoDeLibros(busqueda, pagina);
    res.json(libros);
    } catch (error) {
    console.error('Error en el controlador de libros:', error);
    res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    getLibros,
};