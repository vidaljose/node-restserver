const {response,request} = require('express')

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
const usuariosPost = (req, res = response) => {
    
    const {nombre,edad} = req.body
    
    res.json({
        msg:"post API -- controlador",
        nombre,
        edad,
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