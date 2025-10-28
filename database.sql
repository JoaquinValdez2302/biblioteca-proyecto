-- Borrar tablas existentes si existen (cuidado, esto elimina todos los datos)
-- Descomentá estas líneas SOLO si querés empezar de cero
-- DROP TABLE IF EXISTS Prestamo;
-- DROP TABLE IF EXISTS Multa;
-- DROP TABLE IF EXISTS Libro;
-- DROP TABLE IF EXISTS Socio;
-- DROP TABLE IF EXISTS Usuario;

-- Tabla para almacenar los datos de los socios
CREATE TABLE Socio (
  socio_id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE NOT NULL,
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  -- Nuevas columnas
  email VARCHAR(100) UNIQUE,
  telefono VARCHAR(30),
  numero_de_socio VARCHAR(20) UNIQUE, -- Permitir NULL temporalmente para la lógica de creación
  sancionado_hasta TIMESTAMP WITH TIME ZONE -- Fecha hasta la que está suspendido
);

-- Tabla para el catálogo de libros
CREATE TABLE Libro (
  libro_id SERIAL PRIMARY KEY,
  isbn VARCHAR(20) UNIQUE NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'disponible',
  -- Nueva columna
  precio DECIMAL(10, 2) NOT NULL DEFAULT 0 -- Precio para cálculo de multas por daño
);

-- Tabla para registrar las multas monetarias
CREATE TABLE Multa (
  multa_id SERIAL PRIMARY KEY,
  socio_id INTEGER NOT NULL REFERENCES Socio(socio_id),
  monto DECIMAL(10, 2) NOT NULL,
  motivo VARCHAR(255),
  fecha_emision TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' -- Estados: 'pendiente', 'pagada'
);

-- Tabla para gestionar los préstamos
CREATE TABLE Prestamo (
  prestamo_id SERIAL PRIMARY KEY,
  socio_id INTEGER NOT NULL REFERENCES Socio(socio_id),
  libro_id INTEGER NOT NULL REFERENCES Libro(libro_id),
  multa_id INTEGER REFERENCES Multa(multa_id), -- Relación opcional si el préstamo generó una multa por daño
  fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  fecha_devolucion TIMESTAMP WITH TIME ZONE,
  fecha_vencimiento TIMESTAMP WITH TIME ZONE -- Fecha límite para devolver (calculada al prestar)
);

-- Tabla para usuarios del sistema (login)
CREATE TABLE Usuario (
  usuario_id SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
  contraseña_hash VARCHAR(60) NOT NULL, -- Almacena el hash bcrypt
  rol VARCHAR(20) NOT NULL DEFAULT 'bibliotecario' -- Para futuros roles (admin, etc.)
);

-- --- DATOS INICIALES ---

-- Insertar un usuario administrador (cambiar el hash por el generado con bcrypt)
-- El hash de ejemplo aquí es para la contraseña 'admin123'
INSERT INTO Usuario (nombre_usuario, contraseña_hash, rol) 
VALUES ('admin', '$2b$10$s.4/0hyumM2z8jq3R861kOFHNBqbrFvS1A3MmO11sn4FW61Nhjcri', 'admin'); 
-- ¡¡¡Recordá reemplazar el hash de ejemplo por el real!!!

-- Insertar un socio de prueba (el número de socio se asignará después por el backend)
INSERT INTO Socio (nombre_completo, dni, email, telefono) 
VALUES ('Juan Pérez Ejemplo', '11223344', 'juan.perez@email.com', '11-5555-4444');

-- Insertar un libro de prueba con precio
INSERT INTO Libro (isbn, titulo, autor, precio) 
VALUES ('978-0743273565', 'El Gran Gatsby', 'F. Scott Fitzgerald', 15.50);
INSERT INTO Libro (isbn, titulo, autor, precio) 
VALUES ('978-8497592208', '1984', 'George Orwell', 12.00);

-- Mensaje final (opcional, para ver en la consola de psql)
\echo 'Script de base de datos ejecutado con éxito.'