

const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');


  // Autentica a un usuario verificando su nombre y contraseña.

const autenticarUsuario = async (nombreUsuario, contraseña) => {
  // Busca al usuario por su nombre en el repositorio.
  const usuario = await usuarioRepository.obtenerPorNombreUsuario(nombreUsuario);
  if (!usuario) {
    console.log('Usuario no encontrado en la DB.');
    return null; // Usuario no encontrado
  }
  // Compara la contraseña proporcionada con el hash almacenado en la base de datos.
  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña_hash);
  
  console.log('Resultado de bcrypt.compare:', contraseñaValida);

  if (!contraseñaValida) {
    console.log('Contraseña inválida.');
    return null; // Contraseña incorrecta
  }
  // Si la autenticación es exitosa, devuelve el objeto del usuario sin el hash de la contraseña.
  console.log('Autenticación exitosa.');
  const { contraseña_hash, ...usuarioSinPass } = usuario;
  return usuarioSinPass;
};

module.exports = { autenticarUsuario };