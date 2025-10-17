-- Tabla para almacenar los datos de los socios
CREATE TABLE Socio (
    socio_id SERIAL PRIMARY KEY, -- SERIAL crea un número único que se auto-incrementa
    nombre_completo VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL, -- UNIQUE asegura que no haya DNI repetidos
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para el catálogo de libros
CREATE TABLE Libro (
    libro_id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'disponible' -- Por defecto, un libro nuevo está disponible
);

-- Tabla para registrar las multas
CREATE TABLE Multa (
    multa_id SERIAL PRIMARY KEY,
    socio_id INTEGER NOT NULL REFERENCES Socio(socio_id), -- Clave foránea que apunta a Socio
    monto DECIMAL(10, 2) NOT NULL,
    motivo VARCHAR(255),
    fecha_emision TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente'
);

-- Tabla para gestionar los préstamos (la tabla que conecta todo)
CREATE TABLE Prestamo (
    prestamo_id SERIAL PRIMARY KEY,
    socio_id INTEGER NOT NULL REFERENCES Socio(socio_id), -- Conecta con el socio
    libro_id INTEGER NOT NULL REFERENCES Libro(libro_id), -- Conecta con el libro
    multa_id INTEGER REFERENCES Multa(multa_id), -- Conexión opcional a una multa
    fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion TIMESTAMP WITH TIME ZONE
);

-- Opcional: Añadir algunos datos de prueba para empezar
INSERT INTO Socio (nombre_completo, dni) VALUES ('Juan Pérez', '12345678');
INSERT INTO Libro (isbn, titulo, autor) VALUES ('978-0307474278', 'Cien Años de Soledad', 'Gabriel García Márquez');