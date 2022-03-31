const express = require('express');
const cors = require('cors');
const {dbConnection} = require("./db/config");
require('dotenv').config();
const path = require('path');


// Crear el servidor/aplicacion de express.
const app = express();

// Base de Datos
dbConnection();


// Directorio Público
app.use( express.static('public') )

// CORS
app.use( cors() );

// Lectura y Parseo del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') );

// Manejar demas rutas
app.get( '*', (request, response) => {
    response.sendFile( path.resolve( __dirname, 'public/index.html') );
})

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
