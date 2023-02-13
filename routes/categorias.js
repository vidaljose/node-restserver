const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

// api/categorias

// obtener todas las categorias - publico
router.get('/',obtenerCategorias)

// obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],obtenerCategoria)

// Crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

// Actualizar registro por id - privado - cualquiera con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria)

// Borrar una categoria - admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],borrarCategoria)

module.exports = router