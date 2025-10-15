const express = require('express');
const app = express();
const PORT = 3001; // Puerto para el backend

app.get('/', (req, res) => {
    res.send('¡El servidor del backend está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});