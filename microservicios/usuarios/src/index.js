const express = require('express');
const estudiantesController = require('./controllers/estudiantesController'); //Usar el controlador donde se pondrá la lógica del negocio
const profesoresController = require('./controllers/profesoresController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
const cors = require('cors');

app.use(cors({
    origin: '*'  // Permite solicitudes solo desde localhost:3000
}));
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type']  // Encabezados permitidos
}));

app.use(estudiantesController);
app.use(profesoresController);

app.listen(3005, () => { //El puerto del microservicio es 3005, cada microservicio se lanza en un puerto distinto
    console.log('Microservicio Usuarios ejecutandose en el puerto 3005');
});

