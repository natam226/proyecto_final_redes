const { Router } = require('express');
const router = Router();
const estudiantesModel = require('../models/estudiantesModel'); //se especifica que se va a usar el modelo, que es la lógica de los datos



router.get('/estudiantes', async (req, res) => { 
    var result;
    result = await estudiantesModel.traerEstudiantes(); //Llama a una función del modelo que se llama traerUsuarios
    //console.log(result);
    res.json(result);
});

router.get('/estudiantes/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    var result;
    result = await estudiantesModel.traerEstudiante(usuario);
    //console.log(result);
    res.json(result[0]);
});

router.get('/CorreoEstudiante/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    var result;
    result = await estudiantesModel.traerCorreoEstudiante(usuario);
    //console.log(result);
    res.json(result[0]);
});

router.get('/estudiantes/:usuario/:contrasena', async (req, res) => {
    const usuario = req.params.usuario;
    const contrasena = decodeURIComponent(req.params.contrasena);
    var result;
    result = await estudiantesModel.validarEstudiante(usuario, contrasena);
    //console.log(result);
    res.json(result[0]);
});

router.post('/estudiantes', async (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const paisOrigen = req.body.paisOrigen;
    const necesidadesEspecialesEducacion = req.body.necesidadesEspecialesEducacion;
    const genero = req.body.genero;
    const estadoCivil = req.body.estadoCivil;
    const prestamo = req.body.prestamo;
    const beca = req.body.beca;
    const desplazado = req.body.desplazado;
    const totalCreditos = 0; // Establece el valor por defecto

    var result = await estudiantesModel.crearEstudiante(usuario, contrasena, nombre, correo, paisOrigen, necesidadesEspecialesEducacion, genero, estadoCivil, prestamo, beca, desplazado, totalCreditos);
    res.send("Usuario creado");
});

router.put('/estudiantes/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    const { contrasena, nombre, correo, genero, estadoCivil } = req.body;

    try {
        const result = await estudiantesModel.actualizarEstudiantes(usuario, contrasena, nombre, correo, genero, estadoCivil);
        if (result.affectedRows === 0) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.send('Estudiante actualizado');
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        res.status(500).send('Error al actualizar el estudiante');
    }
});


// Actualizar solo los créditos del estudiante
router.put('/estudiantes/:usuario/creditos', async (req, res) => {
    const usuario = req.params.usuario;
    const { totalCreditos } = req.body; // Asegúrate de enviar solo el nuevo total de créditos

    try {
        // Llama a la función del modelo para actualizar los créditos
        await estudiantesModel.actualizarCreditos(usuario, totalCreditos);
        res.send("Créditos actualizados correctamente");
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar créditos: ${error.message}` });
    }
});


// Obtener créditos totales del estudiante
router.get('/estudiantes/:usuarioEstudiante/creditos', async (req, res) => {
    const { usuarioEstudiante } = req.params;

    try {
        const estudiante = await estudiantesModel.obtenerEstudiante(usuarioEstudiante);

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Supongamos que tienes una función que calcula los créditos totales
        const totalCreditos = calcularTotalCreditos(estudiante.usuario); 

        res.json({ totalCreditos });
    } catch (error) {
        console.error('Error al obtener créditos del estudiante:', error.message);
        res.status(500).json({ error: 'Error al obtener créditos del estudiante' });
    }
});


router.delete('/estudiantes/:usuario', async (req, res) => {
    const usuario = req.params.usuario;

    var result;
    result = await estudiantesModel.borrarEstudiante(usuario);
    //console.log(result);
    res.send("Estudiante eliminado");
});


module.exports = router;