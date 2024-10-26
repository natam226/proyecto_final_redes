const { Router } = require('express');
const router = Router();
const asignaturasModel = require('../models/asignaturasModel');

// Obtener todas las asignaturas
router.get('/asignaturas', async (req, res) => {
    try {
        const result = await asignaturasModel.traerAsignaturas();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaturas', error });
    }
});

// Obtener una asignatura por ID
router.get('/asignaturas/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await asignaturasModel.traerAsignaturaPorId(id);
        if (result.length === 0) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la asignatura', error });
    }
});

// Crear una nueva asignatura
router.post('/asignaturas', async (req, res) => {
    const { nombreAsignatura, creditos, cupos, semestre } = req.body;
    try {
        await asignaturasModel.crearAsignatura(nombreAsignatura, creditos, cupos, semestre);
        res.status(201).send('Asignatura creada');
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la asignatura', error });
    }
});

// Actualizar una asignatura
router.put('/asignaturas/:id', async (req, res) => {
    const id = req.params.id;
    const { nombreAsignatura, creditos, cupos, semestre } = req.body;
    try {
        const result = await asignaturasModel.actualizarAsignatura(id, nombreAsignatura, creditos, cupos, semestre);
        if (result.matchedCount === 0) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.send('Asignatura actualizada');
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la asignatura', error });
    }
});

// Eliminar una asignatura
router.delete('/asignaturas/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await asignaturasModel.borrarAsignatura(id);
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.send('Asignatura borrada');
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar la asignatura', error });
    }
});

// Controlador para actualizar solo los cupos de una asignatura
router.put('/asignaturas/:id/cupos', async (req, res) => {
    const { id } = req.params;
    const { cupos } = req.body;

    try {
        // Asegúrate de que los nuevos cupos sean un número y mayor o igual a cero
        if (typeof cupos !== 'number' || cupos < 0) {
            return res.status(400).json({ error: 'Los cupos deben ser un número mayor o igual a cero' });
        }

        // Actualiza los cupos en la base de datos
        await asignaturasModel.actualizarCupos(id, cupos);
        res.status(200).json({ message: 'Cupos actualizados correctamente' });
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar los cupos: ${error.message}` });
    }
});

// Obtener una asignatura por nombreAsignatura
router.get('/asignaturas/nombre/:nombreAsignatura', async (req, res) => {
    const { nombreAsignatura } = req.params;
    console.log(`Buscando asignatura con el nombre: ${nombreAsignatura}`); // Log de depuración

    try {
        const asignatura = await asignaturasModel.traerAsignaturaPorNombre(nombreAsignatura);

        if (asignatura.length === 0) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }

        res.json(asignatura[0]); // Devuelve la primera asignatura encontrada
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la asignatura: ${error.message}` });
    }
});


module.exports = router;