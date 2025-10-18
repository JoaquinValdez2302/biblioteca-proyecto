const pool = require('../config/database');

// La función ahora acepta la fecha de vencimiento como tercer parámetro
const crear = async (socio_id, libro_id, fecha_vencimiento) => {
    const resultado = await pool.query(
    'INSERT INTO Prestamo (socio_id, libro_id, fecha_vencimiento) VALUES ($1, $2, $3) RETURNING *',
    [socio_id, libro_id, fecha_vencimiento]
    );
    return resultado.rows[0];
};
const obtenerVigentes = async (soloAtrasados = false) => {
    let consulta = `
        SELECT 
            p.prestamo_id,
            p.fecha_inicio,
            p.fecha_vencimiento,
            l.titulo AS libro_titulo,
            s.nombre_completo AS socio_nombre,
            s.numero_de_socio
        FROM Prestamo p
        JOIN Libro l ON p.libro_id = l.libro_id
        JOIN Socio s ON p.socio_id = s.socio_id
        WHERE p.fecha_devolucion IS NULL
        `;
    
      // Si el filtro está activado, añadimos la condición de atraso
        if (soloAtrasados) {
        consulta += ' AND p.fecha_vencimiento < NOW()';
        }
    
        const resultado = await pool.query(consulta);
        return resultado.rows;
};

const obtenerVencenHoy = async () => {
    const consulta = `
    SELECT l.titulo, s.nombre_completo
    FROM Prestamo p
    JOIN Libro l ON p.libro_id = l.libro_id
    JOIN Socio s ON p.socio_id = s.socio_id
    WHERE p.fecha_devolucion IS NULL AND p.fecha_vencimiento::date = CURRENT_DATE
  `;
    const resultado = await pool.query(consulta);
    return resultado.rows;
};

// Obtiene las últimas 5 devoluciones
const obtenerUltimasDevoluciones = async () => {
    const consulta = `
    SELECT l.titulo, s.nombre_completo, p.fecha_devolucion
    FROM Prestamo p
    JOIN Libro l ON p.libro_id = l.libro_id
    JOIN Socio s ON p.socio_id = s.socio_id
    WHERE p.fecha_devolucion IS NOT NULL
    ORDER BY p.fecha_devolucion DESC
    LIMIT 5
  `;
    const resultado = await pool.query(consulta);
    return resultado.rows;
};

module.exports = { 
    crear,
    obtenerVigentes,
    obtenerVencenHoy,
    obtenerUltimasDevoluciones,
};