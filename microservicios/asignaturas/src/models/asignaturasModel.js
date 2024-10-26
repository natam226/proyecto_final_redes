const mysql = require('mysql2/promise');

// Crear la conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'asignaturasDB'
});

// Obtener todas las asignaturas
async function traerAsignaturas() {
    const [rows] = await connection.query('SELECT * FROM asignaturas');
    return rows;
}

// Obtener una asignatura por ID
async function traerAsignaturaPorId(id) {
    const [rows] = await connection.query('SELECT * FROM asignaturas WHERE id = ?', [id]);
    return rows;
}

async function traerAsignaturaPorNombre(nombreAsignatura) {
    console.log(`Buscando asignatura: ${nombreAsignatura}`); // Para depuración
    const [rows] = await connection.query('SELECT * FROM asignaturas WHERE nombreAsignatura = ?', [nombreAsignatura]);
    return rows;
}

// Crear una nueva asignatura
async function crearAsignatura(nombreAsignatura, creditos, cupos, semestre) {
    const [result] = await connection.query('INSERT INTO asignaturas (nombreAsignatura, creditos, cupos, semestre) VALUES (?, ?, ?, ?)', [nombreAsignatura, creditos, cupos, semestre]);
    return result;
}

// Actualizar una asignatura existente
async function actualizarAsignatura(id, nombreAsignatura, creditos, cupos, semestre) {
    const [result] = await connection.query('UPDATE asignaturas SET nombreAsignatura = ?, creditos = ?, cupos = ?, semestre = ? WHERE id = ?', [nombreAsignatura, creditos, cupos, semestre, id]);
    return result;
}

// Eliminar una asignatura por ID
async function borrarAsignatura(id) {
    const [result] = await connection.query('DELETE FROM asignaturas WHERE id = ?', [id]);
    return result;
}

async function actualizarCupos(id, nuevosCupos) {
    const query = 'UPDATE asignaturas SET cupos = ? WHERE id = ?';
    await connection.query(query, [nuevosCupos, id]);
}


module.exports = {
    traerAsignaturas,
    traerAsignaturaPorId,
    crearAsignatura,
    actualizarAsignatura,
    borrarAsignatura,
    actualizarCupos,
    traerAsignaturaPorNombre
};