const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'cursosDB'
});

// Obtener cursos por estudiante y periodo
async function obtenerCursosPorEstudianteYPeriodo(nombreEstudiante, periodo) {
    const [result] = await connection.query(
        `SELECT * FROM cursos WHERE nombreEstudiante = ? AND periodo = ?`, 
        [nombreEstudiante, periodo]
    );
    return result;
}

async function obtenerCursosPorEstudianteNoPeriodo(nombreEstudiante, periodoExcluido) {
    const query = `SELECT * FROM cursos WHERE nombreEstudiante = ? AND periodo <> ?`;
    const [results] = await connection.query(query, [nombreEstudiante, periodoExcluido]);
    return results;
}

async function obtenerCursos() {
    return await obtenerTodosLosCursos();
}

// Obtener cursos por profesor y periodo
async function obtenerCursosPorProfesorYPeriodo(correoProfesor, periodo) {
    const [result] = await connection.query(
        `SELECT * FROM cursos WHERE correoProfesor = ? AND periodo = ?`,
        [correoProfesor, periodo]
    );
    return result;
}

async function obtenerNotasPorEstudiante(correoEstudiante) {
    const [result] = await connection.query(
        `SELECT nombreCurso, nota, periodo FROM cursos WHERE correoEstudiante = ?`,
        correoEstudiante
    );
    return result;
}

// Obtener todos los cursos
async function obtenerTodosLosCursos() {
    const [result] = await connection.query('SELECT * FROM cursos');
    return result;
}

async function traerCursoPorNombreYGrupo(nombreCurso, grupo) {
    const query = `
        SELECT nombreCurso, grupo, nombreEstudiante, correoEstudiante, nota, profesor, correoProfesor
        FROM cursos
        WHERE nombreCurso = ? AND grupo = ? AND periodo = ?`;    
        
    const periodo = '2024-3'; // Definir el periodo a filtrar
    const [results] = await connection.query(query, [nombreCurso, grupo, periodo]);
    return results.length > 0 ? results[0] : null; // Retorna solo el primer resultado o null si no hay ninguno
}


async function traerCursoPorProfe(correoProfesor) {
    const query = "SELECT nombreCurso, nota FROM cursos WHERE correoProfesor = ?";    
    const [results] = await connection.query(query, [correoProfesor]);
    return results; // Asegúrate de que retornas todos los resultados
}


async function crearCurso(curso) {
    const { nombreCurso, grupo, profesor, correoProfesor, nombreEstudiante, correoEstudiante, nota, periodo } = curso;
    try {
        const [result] = await connection.query(
            `INSERT INTO cursos (nombreCurso, grupo, profesor, correoProfesor, nombreEstudiante, correoEstudiante, nota, periodo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombreCurso, grupo, profesor, correoProfesor, nombreEstudiante, correoEstudiante, nota, periodo]
        );
        return result;
    } catch (error) {
        console.error('Error en crearCurso:', error.message);
        throw error;
    }
}

async function actualizarNotaPorNombre(nombreEstudiante, grupo, nombreCurso, nota) {
    const [result] = await connection.query(
        `UPDATE cursos SET nota = ? WHERE nombreEstudiante = ? AND grupo = ? AND nombreCurso = ? AND periodo = '2024-3'`,
        [nota, nombreEstudiante, grupo, nombreCurso]
    );
    return result;
}

// Obtener el número de grupos disponibles por periodo
async function contarGruposPorPeriodo(periodo) {
    try {
        const [result] = await connection.query(
            'SELECT grupo, COUNT(*) AS total FROM cursos WHERE periodo = ? GROUP BY grupo',
            [periodo]
        );
        return result; // Retorna el resultado con grupos y sus conteos
    } catch (error) {
        console.error('Error en contarGruposPorPeriodo:', error.message);
        throw error;
    }
}

// Obtener un nuevo número de grupo
async function obtenerNuevoGrupo(periodo) {
    try {
        const grupos = await contarGruposPorPeriodo(periodo);

        // Filtrar grupos que tienen menos de 25 registros
        const gruposDisponibles = grupos.filter(grupo => grupo.total < 25);

        // Si hay grupos disponibles, retorna el primer grupo disponible
        if (gruposDisponibles.length > 0) {
            return gruposDisponibles[0].grupo; // Retorna el grupo existente que tiene menos de 25 registros
        }

        // Si no hay grupos disponibles, verifica el máximo grupo creado
        const [maxGroupResult] = await connection.query(
            'SELECT MAX(grupo) AS maxGrupo FROM cursos WHERE periodo = ?',
            [periodo]
        );
        const maxGrupo = maxGroupResult[0].maxGrupo || 0;

        // Crea un nuevo grupo si es menor a 3
        if (maxGrupo < 3) {
            return maxGrupo + 1; // Incrementa el grupo si es menor a 3
        } else {
            throw new Error('Se han alcanzado el límite de grupos (1-3)');
        }
    } catch (error) {
        console.error('Error en obtenerNuevoGrupo:', error.message);
        throw error;
    }
}

// Obtener asignaturas no cursadas o con nota baja
async function obtenerAsignaturasNoCursadasONotaBaja(nombreEstudiante) {
    try {
        const [result] = await connection.query(`
            SELECT a.nombreCurso, c.nota
            FROM cursos a
            LEFT JOIN cursos c ON a.nombreCurso = c.nombreCurso AND c.nombreEstudiante = ?
            WHERE c.nombreEstudiante IS NULL OR c.nota < 3
        `, [nombreEstudiante]);

        return result;
    } catch (error) {
        console.error('Error en obtenerAsignaturasNoCursadasONotaBaja:', error.message);
        throw error;
    }
}

// Contar estudiantes en un grupo específico
async function contarEstudiantesEnGrupo(nombreCurso, grupo) {
    const [result] = await connection.query('SELECT COUNT(*) AS cantidad FROM cursos WHERE nombreCurso = ? AND grupo = ?', [nombreCurso, grupo]);
    return result[0].cantidad;
}

// Contar grupos para un nombre de curso y periodo
async function contarGruposPorNombreCurso(nombreCurso, periodo) {
    try {
        const [result] = await connection.query(
            'SELECT grupo, COUNT(*) AS total FROM cursos WHERE nombreCurso = ? AND periodo = ? GROUP BY grupo',
            [nombreCurso, periodo]
        );
        return result; // Retorna el resultado con grupos y sus conteos
    } catch (error) {
        console.error('Error en contarGruposPorNombreCurso:', error.message);
        throw error;
    }
}

// Obtener todos los profesores
async function obtenerProfesores() {
    const [result] = await connection.query('SELECT nombre, correo FROM profesores');
    return result;
}

// Obtener todos los profesores
async function obtenerProfesores() {
    const [result] = await connection.query('SELECT nombre, correo FROM profesores');
    return result;
}

// Función para obtener un profesor aleatorio (ahora ficticio)
const obtenerProfesorAleatorio = () => {
    // Puedes personalizar los datos del profesor aquí
    const profesor = {
        nombre: 'Nombre del Profesor',
        correo: 'correo@ejemplo.com'
    };
    return profesor;
};

module.exports = {
    obtenerCursosPorEstudianteYPeriodo,
    obtenerCursosPorProfesorYPeriodo,
    obtenerNotasPorEstudiante,
    obtenerTodosLosCursos,
    traerCursoPorNombreYGrupo,
    traerCursoPorProfe,
    crearCurso,
    actualizarNotaPorNombre,
    obtenerNuevoGrupo,
    obtenerAsignaturasNoCursadasONotaBaja,
    obtenerCursosPorEstudianteNoPeriodo,
    contarEstudiantesEnGrupo,
    contarGruposPorNombreCurso,
    obtenerProfesores,
    obtenerProfesorAleatorio,
    obtenerCursos 
};