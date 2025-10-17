const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

// 1. Configura la conexión a tu base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'guillotinekuro202',
    port: 5432,
});

async function poblarBaseDeDatos() {
    console.log('Conectando a la base de datos...');
    const client = await pool.connect();
    
    try {
    console.log('Limpiando tablas existentes...');
    // Borramos los datos para empezar de cero cada vez que corremos el script
    await client.query('TRUNCATE TABLE Prestamo, Multa, Socio, Libro RESTART IDENTITY CASCADE');

    // 2. Insertar Socios Falsos
console.log('Insertando socios...');
for (let i = 0; i < 20; i++) {
    const nombreCompleto = faker.person.fullName();
    const dni = faker.string.numeric(8);
  // Generamos un número de socio aleatorio, ej: "S-123456"
    const numeroDeSocio = `S-${faker.string.numeric(6)}`; 
    await client.query(
    'INSERT INTO Socio (nombre_completo, dni, numero_de_socio) VALUES ($1, $2, $3)',
    [nombreCompleto, dni, numeroDeSocio]
    );
}

    // 3. Insertar Libros Falsos
    console.log('Insertando libros...');
    for (let i = 0; i < 50; i++) {
      const titulo = faker.lorem.words(3).replace(/\b\w/g, l => l.toUpperCase()); // Título con mayúsculas
        const autor = faker.person.fullName();
        const isbn = faker.commerce.isbn();
        await client.query(
        'INSERT INTO Libro (titulo, autor, isbn) VALUES ($1, $2, $3)',
        [titulo, autor, isbn]
        );
    }

    console.log('✅ ¡Base de datos poblada con éxito!');

    } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    } finally {
    console.log('Cerrando conexión.');
    client.release();
    await pool.end();
    }
}

poblarBaseDeDatos();