const { Router } = require('express')
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios')
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');

const router = Router()

router.get('/', usuariosGet)
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)
router.post('/',[
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('password', 'EL password es obligatorio y debe tener mas de 6 letras').isLength({min:6}),
    check('correo', 'EL correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)
router.delete('/:id', usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router