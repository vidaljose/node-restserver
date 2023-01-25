const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuaio = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {

    const { nombre = 'No name', api } = req.query

    res.json({
        msg: "get API -- controlador",
        nombre,
        api
    })
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params

    res.json({
        msg: `put API -- controlador el id es ${id}`,
        id
    })
}
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuaio({nombre,correo,password,rol})

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)

    // Guardar en base de datos
    await usuario.save()

    res.json({
        usuario
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API -- controlador"
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API -- controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    usuariosPatch
}