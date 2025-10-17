const { Pool } = require('pg');

// Variable para almacenar la única instancia del pool
let poolInstance;

// La función que implementa el patrón Singleton
function getPool() {
  // Si la instancia del pool todavía no existe, la creamos
    if (!poolInstance) {
    console.log("Creando una nueva instancia del pool de conexiones...");
    poolInstance = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'guillotinekuro202',
    port: 5432,
    });
}

  // Devolvemos la instancia existente (o la recién creada)
return poolInstance;
}

// Exportamos la función que nos da acceso al Singleton
module.exports = getPool();