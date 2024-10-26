const express = require('express');
const morgan = require('morgan');
const asignaturasControllers = require('./controllers/asignaturasController'); // Importar el controlador
const cors = require('cors');
const app = express();

// Middleware para registrar las solicitudes HTTP
app.use(morgan('dev'));

app.use(cors({
    origin: '*'  // Permite solicitudes solo desde localhost:3000

}));
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type']  // Encabezados permitidos
}));
// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configura las rutas para el controlador de asignaturas
app.use(asignaturasControllers);

// Puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
    console.log(`Microservicio Asignaturas ejecutándose en el puerto ${PORT}`);
});
