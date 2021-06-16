const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/user');
const { esRolValido, esEmailValido, existeUsuario } = require('../helpers/dbValidaciones');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(esEmailValido),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener al menos 6 letras').isLength({ min: 6 }),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
],usuariosDelete);


module.exports = router;