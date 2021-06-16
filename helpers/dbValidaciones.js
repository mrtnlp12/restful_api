const { response } = require('express');
const Rol = require('../models/roles');
const Usuario = require('../models/usuario');

const esRolValido = async( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const esEmailValido = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error('El correo ya ha sido registrado');
    }
}

const existeUsuario = async( id = '' ) => {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw new Error('No existe usuario con ese id');
    }
}
module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuario
}