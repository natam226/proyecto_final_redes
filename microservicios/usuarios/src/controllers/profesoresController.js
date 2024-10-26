const { Router } = require('express');
const router = Router();
const profesoresModel = require('../models/profesoresModel'); //se especifica que se va a usar el modelo, que es la lógica de los datos



router.get('/profesores', async (req, res) => { 
    var result;
    result = await profesoresModel.traerProfesores(); //Llama a una función del modelo que se llama traerUsuarios
    //console.log(result);
    res.json(result);
});

router.get('/profesores/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    var result;
    result = await profesoresModel.traerProfesor(usuario);
    //console.log(result);
    res.json(result[0]);
});

router.get('/correoprof/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    var result;
    result = await profesoresModel.traerCorreo(usuario);
    //console.log(result);
    res.json(result[0]);
});

router.get('/profesores/:usuario/:contrasena/:rol', async (req, res) => {
    const usuario = req.params.usuario;
    const contrasena = decodeURIComponent(req.params.contrasena);
    const rol = req.params.rol;

    var result;
    result = await profesoresModel.validarProfesor(usuario, contrasena, rol);
    //console.log(result);
    res.json(result[0]);
});

router.post('/profesores', async (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    const rol = req.body.rol;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const ultimoGradoDeFormacion = req.body.ultimoGradoDeFormacion;

    var result = await profesoresModel.crearProfesor(usuario, contrasena, rol, nombre, correo, ultimoGradoDeFormacion);
    res.send("Profesor creado");
});

router.put('/profesores/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const ultimoGradoDeFormacion = req.body.ultimoGradoDeFormacion;

    var result;
    result = await profesoresModel.actualizarProfesor(usuario, contrasena, nombre, correo, ultimoGradoDeFormacion);
    res.send("Profesor actualizado");
});

router.delete('/profesores/:usuario', async (req, res) => {
    const usuario = req.params.usuario;

    var result;
    result = await profesoresModel.borrarProfesor(usuario);
    //console.log(result);
    res.send("Profesor eliminado");
});

module.exports = router;