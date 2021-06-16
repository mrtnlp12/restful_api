const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Base de datos
        this.conectarDb();
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
    middlewares() {
        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
    }
}

module.exports = Server;