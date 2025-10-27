// src/services/usuarioService.js
const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');

const autenticarUsuario = async (nombreUsuario, contraseña) => {
  const usuario = await usuarioRepository.obtenerPorNombreUsuario(nombreUsuario);
  if (!usuario) {
    console.log('Usuario no encontrado en la DB.');
    return null; // Usuario no encontrado
  }
  // Comparamos la contraseña ingresada con el hash guardado
  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña_hash);
  
  console.log('Resultado de bcrypt.compare:', contraseñaValida);

  if (!contraseñaValida) {
    console.log('Contraseña inválida.');
    return null; // Contraseña incorrecta
  }
  // Si todo está bien, devolvemos el usuario (sin el hash de la contraseña)
  console.log('Autenticación exitosa.');
  const { contraseña_hash, ...usuarioSinPass } = usuario;
  return usuarioSinPass;
};

module.exports = { autenticarUsuario };