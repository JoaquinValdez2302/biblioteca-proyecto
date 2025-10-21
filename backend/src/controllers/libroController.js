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

const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, isbn, precio } = req.body;
        // Basic validation: Check if required fields are present
        if (!titulo || !autor || !isbn || precio === undefined) {
            return res.status(400).json({ mensaje: 'Todos los campos (título, autor, isbn, precio) son requeridos' });
        }
        // Optional: Add more specific validation (e.g., price is a number, ISBN format)

        const nuevoLibro = await bibliotecaFacade.agregarNuevoLibro(titulo, autor, isbn, precio);
        res.status(201).json(nuevoLibro); // 201 Created
    } catch (error) {
        // Log the detailed error on the server for debugging
        console.error('Error al crear el libro:', error);

        // Check for specific known errors (like duplicate ISBN if you implement that check)
        if (error.code === '23505') { // PostgreSQL unique violation code
            return res.status(409).json({ mensaje: 'Error: El ISBN ya existe.' }); // 409 Conflict
        }

        // Send a generic error response to the client
        res.status(500).json({ mensaje: 'Error interno del servidor al intentar crear el libro.' });
    }
};

module.exports = {
    getLibros,
    crearLibro,
};