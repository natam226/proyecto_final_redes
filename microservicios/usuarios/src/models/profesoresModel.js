const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'usuariosDB'
});


async function traerProfesores() {
    const result = await connection.query('SELECT * FROM profesores');
    return result[0];
}

async function traerProfesor(usuario) {
    const result = await connection.query('SELECT * FROM profesores WHERE usuario = ?', usuario);
    return result[0];
}

async function traerCorreo(usuario) {
    const result = await connection.query('SELECT correo FROM profesores WHERE usuario = ?', usuario);
    return result[0];
}

async function actualizarProfesor(usuario, contrasena, nombre, correo, ultimoGradoDeFormacion) {
    const result = await connection.query('UPDATE profesores SET contrasena = ?, nombre = ?, correo = ?, ultimoGradoDeFormacion = ? WHERE usuario = ?', [contrasena, nombre, correo, ultimoGradoDeFormacion, usuario]);
    return result;
}

async function validarProfesor(usuario, contrasena, rol) {
    const result = await connection.query('SELECT * FROM profesores WHERE usuario = ? AND contrasena = ? AND rol = ?', [usuario, contrasena, rol]);
    return result;
}

async function crearProfesor(usuario, contrasena, rol, nombre, correo, ultimoGradoDeFormacion) {
    const result = await connection.query('INSERT INTO profesores VALUES(?,?,?,?,?,?)', [usuario, contrasena, rol, nombre, correo, ultimoGradoDeFormacion]);
    return result;
}

async function borrarProfesor(usuario) {
    const result = await connection.query('DELETE FROM profesores WHERE usuario = ?', usuario);
    return result[0];
}

module.exports = {
    traerProfesores, 
    traerProfesor, 
    traerCorreo, 
    actualizarProfesor, 
    validarProfesor, 
    crearProfesor, 
    borrarProfesor
}