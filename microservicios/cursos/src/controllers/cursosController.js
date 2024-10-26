const express = require('express');
const router = express.Router();
const cursosModel = require('../models/cursosModel');
const axios = require('axios');

// Obtener cursos que un estudiante ha cursado en el pasado
router.get('/cursos/estudiante/:nombreEstudiante/pasados', async (req, res) => {
    const { nombreEstudiante } = req.params;

    try {
        // Verificar si el estudiante existe
        const responseEstudiante = await axios.get(`http://localhost:3005/estudiantes/${nombreEstudiante}`);
        if (responseEstudiante.status !== 200) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Obtener cursos pasados
        const cursos = await cursosModel.obtenerCursosPorEstudianteNoPeriodo(nombreEstudiante, '2024-3');

        if (!cursos || cursos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos pasados para este estudiante.' });
        }

        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ error: `Error al obtener los cursos: ${error.message}` });
    }
});

// Obtener cursos que un estudiante está cursando actualmente
router.get('/cursos/estudiante/:nombreEstudiante/actual', async (req, res) => {
    const { nombreEstudiante } = req.params;

    try {
        const responseEstudiante = await axios.get(`http://localhost:3005/estudiantes/${nombreEstudiante}`);
        if (responseEstudiante.status !== 200) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        const cursos = await cursosModel.obtenerCursosPorEstudianteYPeriodo(nombreEstudiante, '2024-3');
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos actuales:', error);
        res.status(500).json({ error: `Error al obtener los cursos actuales del estudiante: ${error.message}` });
    }
});


// Obtener cursos de un profesor en un periodo específico
router.get('/cursos/profesor/:correoProfesor', async (req, res) => {
    const { correoProfesor } = req.params;
    const periodo = '2024-3'; // Define el periodo fijo aquí
    try {
        const cursos = await cursosModel.obtenerCursosPorProfesorYPeriodo(correoProfesor, periodo);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los cursos del profesor: ${error.message}` });
    }
});

router.get('/cursos/notas/:correoEstudiante', async (req, res) => {
    const { correoEstudiante } = req.params;
    try {
        const cursos = await cursosModel.obtenerNotasPorEstudiante(correoEstudiante);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los notas del alumno: ${error.message}` });
    }
});

router.get('/cursos/rendimiento/:correoProfesor', async (req, res) => {
    const { correoProfesor } = req.params;
    try {
        const cursos = await cursosModel.traerCursoPorProfe(correoProfesor,);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los cursos del profesor: ${error.message}` });
    }
});

// Obtener todos los cursos sin ningún filtro
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await cursosModel.obtenerTodosLosCursos();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener todos los cursos: ${error.message}` });
    }
});

// Obtener detalles de un curso por nombreCurso y grupo
router.get('/cursos/:nombreCurso/:grupo', async (req, res) => {
    const { nombreCurso, grupo } = req.params;

    try {
        const curso = await cursosModel.traerCursoPorNombreYGrupo(nombreCurso, grupo);

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json({
            nombreCurso: curso.nombreCurso,  // Usar nombreCurso del objeto curso
            grupo: curso.grupo,
        });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener el curso: ${error.message}` });
    }
});



// Obtener asignaturas no cursadas o con nota baja para un estudiante
router.get('/cursos/asignaturas/no-cursadas-o-nota-baja/:nombreEstudiante', async (req, res) => {
    const { nombreEstudiante } = req.params;

    try {
        const asignaturas = await cursosModel.obtenerAsignaturasNoCursadasONotaBaja(nombreEstudiante);

        // Usar un Set para filtrar los nombres duplicados
        const nombresUnicos = [...new Set(asignaturas.map(asig => asig.nombreCurso))];

        // Mapear a un nuevo formato
        const resultado = nombresUnicos.map(nombre => ({ nombreCurso: nombre }));

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener asignaturas no cursadas o con nota baja: ${error.message}` });
    }
});

// Matricular un estudiante en un curso
router.post('/cursos/matricular', async (req, res) => {
    const { usuarioEstudiante, nombreAsignatura } = req.body;

    // Verificar que los datos necesarios están presentes
    if (!usuarioEstudiante || !nombreAsignatura) {
        console.error('Faltan datos en la solicitud:', { usuarioEstudiante, nombreAsignatura });
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        // Obtener datos de la asignatura
        const responseAsignatura = await axios.get(`http://localhost:3006/asignaturas/nombre/${nombreAsignatura}`);
        if (responseAsignatura.status !== 200) {
            throw new Error('Error al obtener la asignatura');
        }
        const { nombreAsignatura: nombre, cupos, creditos } = responseAsignatura.data;

        // Obtener datos del estudiante
        const responseEstudiante = await axios.get(`http://localhost:3005/estudiantes/${usuarioEstudiante}`);
        if (responseEstudiante.status !== 200) {
            throw new Error('Error al obtener los datos del estudiante');
        }
        const { nombre: nombreEstudiante, correo: correoEstudiante, totalCreditos } = responseEstudiante.data;

        // Verificar límites de créditos
        if (totalCreditos + creditos > 18) {
            return res.status(400).json({ error: 'El estudiante supera el límite de 18 créditos' });
        }

        // Verificar disponibilidad de cupos
        if (cupos <= 0) {
            return res.status(400).json({ error: 'No hay cupos disponibles' });
        }

        // Obtener el grupo
        const grupo = await cursosModel.obtenerNuevoGrupo('2024-3');

        // Verificar si ya hay un curso existente
        const cursoExistente = await cursosModel.traerCursoPorNombreYGrupo(nombre, grupo);
        let profesor;

        // Si existe un curso, asignar su profesor
        if (cursoExistente) {
            profesor = {
                nombre: cursoExistente.profesor,
                correo: cursoExistente.correoProfesor,
            };
        } else {
            console.log('No se encontró curso existente. Obteniendo un profesor aleatorio...');

            // Obtener todos los profesores disponibles (Ajusta la URL según tu API de profesores)
            const responseProfesores = await axios.get('http://localhost:3005/profesores');
            if (responseProfesores.status !== 200) {
                throw new Error('Error al obtener la lista de profesores');
            }

            const profesores = responseProfesores.data;

            // Comprobar si hay profesores disponibles
            if (profesores.length === 0) {
                return res.status(500).json({ error: 'No hay profesores disponibles para asignar.' });
            }

            // Seleccionar un profesor aleatorio
            const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
            profesor = {
                nombre: profesorAleatorio.nombre,
                correo: profesorAleatorio.correo,
            };

            console.log('Profesor asignado:', profesor);
        }

        // Verificar que el profesor tenga los campos necesarios
        if (!profesor || !profesor.nombre || !profesor.correo) {
            return res.status(500).json({ error: 'No se pudo asignar un profesor.' });
        }

        // Crear el nuevo curso
        const nuevoCurso = {
            nombreCurso: nombre,
            grupo,
            profesor: profesor.nombre,
            correoProfesor: profesor.correo,
            nombreEstudiante,
            correoEstudiante,
            nota: null,
            periodo: '2024-3',
        };

        // Guardar el curso en la base de datos
        await cursosModel.crearCurso(nuevoCurso);

        // Actualizar cupos de la asignatura
        await axios.put(`http://localhost:3006/asignaturas/${responseAsignatura.data.id}/cupos`, { cupos: cupos - 1 });

        // Actualizar créditos del estudiante
        await axios.put(`http://localhost:3005/estudiantes/${usuarioEstudiante}/creditos`, { totalCreditos: totalCreditos + creditos });

        res.status(201).json({ message: 'Estudiante matriculado exitosamente' });
    } catch (error) {
        console.error('Error en la matriculación:', error);
        res.status(500).json({ error: `Error al matricular estudiante: ${error.message}` });
    }
});



router.put('/cursos/actualizarNota', async (req, res) => {
    const { nombreEstudiante, grupo, nombreCurso, nota } = req.body;

    // Log de los datos recibidos
    console.log({
        nombreEstudiante,
        grupo,
        nombreCurso,
        nota
    });

    if (!nombreEstudiante || !grupo || !nombreCurso || nota === undefined) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        const result = await cursosModel.actualizarNotaPorNombre(nombreEstudiante, grupo, nombreCurso, nota);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado o el estudiante no está matriculado' });
        }

        res.status(200).json({ message: 'Nota actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar la nota: ${error.message}` });
    }
});

module.exports = router;