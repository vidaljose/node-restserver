require('dotenv').config() //Esto para leer las variables de entorno
const Server = require('./models/server')

const server = new Server()
server.listen();
