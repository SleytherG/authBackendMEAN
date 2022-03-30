const { Router } = require('express');
const { crearUsuario, renewToken, loginUsuario } = require("../controllers/auth");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

/**
 * Crear un nuevo usuario
 */
router.post( '/newUser', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 } ),
    validarCampos
], crearUsuario );

/**
 * Login de Usuario
 */
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6} ),
    validarCampos
], loginUsuario );

/**
 * Validar y Revalidar Token
 */
router.get( '/renew', validarJWT, renewToken );


module.exports = router;
