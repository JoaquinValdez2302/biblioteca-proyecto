// backend/scripts/hashear_pass.js
const bcrypt = require('bcrypt');
const saltRounds = 10; // Factor de coste (más alto = más seguro pero más lento)
const contraseñaPlana = 'admin123'; // La contraseña que pusiste en la DB

bcrypt.hash(contraseñaPlana, saltRounds, function(err, hash) {
  if (err) {
    console.error("Error al hashear:", err);
    return;
  }
  console.log("Contraseña plana:", contraseñaPlana);
  console.log("Hash generado:", hash);
  console.log("\nCopiá este hash y actualizá la base de datos manualmente con pgAdmin.");
});