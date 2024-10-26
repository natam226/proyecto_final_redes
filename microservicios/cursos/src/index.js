// index.js
const express = require('express');
const cursosController = require('./controllers/cursosController');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
    origin: '*'  // Permite solicitudes solo desde localhost:3000
}));
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type']  // Encabezados permitidos
}));

app.use(cursosController); // Asegúrate de usar un prefijo para evitar conflictos con otras rutas

app.listen(3007, () => { // El puerto del microservicio es 3007
    console.log('Microservicio Cursos ejecutándose en el puerto 3007');
});
