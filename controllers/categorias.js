const { response, request } = require("express")
const {Categoria} = require("../models")

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
    
    const {desde=0,limit=5} = req.query
    
    const query = {estado:true}

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query) ,
        Categoria.find(query).populate('usuario','nombre').skip(Number(desde)).limit(Number(limit))]) 
    res.json({
        categorias,
        total
    })
}

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res=response) => {
    const {id} = req.params
    const categoria = await Categoria.findOne({id}).populate('usuario','nombre')
    
    res.json({
        categoria
    })
}

// crearCategoria
const crearCategoria = async(req=request, res=response) => {

    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB =  await Categoria.findOne({nombre})
    if(categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id 
    }
    const categoria = new Categoria(data)

    //Guardar DB
    await categoria.save()

    res.status(201).json(categoria)
}

// actualizarCategoria
const actualizarCategoria = async(req,res=response) =>{
    const {id} = req.params
    const nombre = req.body.nombre.toUpperCase()
    const usuario = req.usuario._id
    const categoriaDB =  await Categoria.findOne({nombre})
    if(categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id,{nombre,usuario},{new:true})
    
    res.json({
        categoria
    })
}


// borrarCategoria - estado:false
const borrarCategoria = async(req,res=response) =>{
    const {id} = req.params
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    
    res.json({
        categoria
    })
}

module.exports= {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}