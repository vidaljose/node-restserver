
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        requied: [true, 'El nombre es obligatorio']
    },
    correo: {
        type:String,
        requied: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type:String,
        requied: [true, 'la contraseña es obligatoria']
    },
    img: {
        type:String
    },
    rol: {
        type:String,
        requied: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default: false
    },
})

module.exports = model('Usuaio',UsuarioSchema)