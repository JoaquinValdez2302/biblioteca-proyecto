// src/__tests__/api.test.js
const request = require('supertest');
const app = require('../../index');
const pool = require('../../src/config/database');

describe('Endpoints de API', () => {

  // Creamos un agente para mantener la sesión entre peticiones
  const agent = request.agent(app);

  // Variable para guardar la cookie si la necesitamos explícitamente (opcional)
  let cookieSession;

  // Paso 1: Prueba de Login (antes de probar rutas protegidas)
  it('POST /api/auth/login debería iniciar sesión correctamente', async () => {
    const resLogin = await agent // Usamos el agente
      .post('/api/auth/login')
      .send({ nombreUsuario: 'admin', contraseña: 'admin123' }); // Enviamos credenciales

    expect(resLogin.statusCode).toEqual(200); // Esperamos 200 OK
    expect(resLogin.body).toHaveProperty('usuario'); // Esperamos que devuelva el usuario
    // Opcional: guardar la cookie si la necesitáramos para algo más
    // cookieSession = resLogin.headers['set-cookie']; 
  });

  // Paso 2: Prueba de la ruta protegida (usando el mismo agente)
  it('GET /api/libros debería devolver la lista de libros si está autenticado', async () => {
    // Como ya hicimos login con el 'agent', esta petición llevará la cookie de sesión
    const resLibros = await agent.get('/api/libros'); 

    expect(resLibros.statusCode).toEqual(200); // Ahora esperamos 200 OK
    expect(resLibros.body).toHaveProperty('libros'); // Verificamos la estructura esperada (o 'libros' si tu API devuelve eso)
   expect(Array.isArray(resLibros.body.libros)).toBe(true); // Verificamos que sea un array
    expect(resLibros.body).toHaveProperty('total'); // Verificamos la propiedad total
  });

  // Podrías añadir una prueba para /api/auth/logout aquí también
  
});

// Cerramos el pool de DB al final
afterAll(async () => {
  await pool.end();
});