const { Pool } = require("pg");

// Variable para almacenar la única instancia del pool
let poolInstance;

// La función que implementa el patrón Singleton
function getPool() {
  // Si la instancia del pool todavía no existe, la creamos
  if (!poolInstance) {
    console.log("Creando una nueva instancia del pool de conexiones...");
    const connectionString =
      process.env.DATABASE_URL ||
      "postgresql://postgres:guillotinekuro202@localhost:5432/biblioteca";
    const sslConfig =
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false } // Necesario en Render para evitar errores de certificado
        : false;
    poolInstance = new Pool({
      connectionString: connectionString,
      ssl: sslConfig,
    });
  }

  // Devolvemos la instancia existente (o la recién creada)
  return poolInstance;
}

// Exportamos la función que nos da acceso al Singleton
module.exports = getPool();
