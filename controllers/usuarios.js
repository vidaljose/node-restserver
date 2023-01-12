const {response,request} = require('express')
const Usuaio = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {
    
    const {nombre = 'No name',api} = req.query

    res.json({
        msg:"get API -- controlador",
        nombre,
        api
    })
}
const usuariosPut = (req, res = response) => {
    const {id} = req.params
    
    res.json({
        msg:`put API -- controlador el id es ${id}`,
        id
    })
}
const usuariosPost = async (req, res = response) => {
    
    const body = req.body
    const usuario = new Usuaio(body)
    await usuario.save()
    
    res.json({
        msg:"post API -- controlador",
        usuario
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg:"delete API -- controlador"
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg:"patch API -- controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    usuariosPatch
}