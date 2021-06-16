const { response } = require('express');
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcryptjs');

const usuariosGet = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( { estado: true } ),
        Usuario.find({ estado: true })
                .skip( Number(desde) )
                .limit( Number(limite) )
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password.toString(), salt);

    await usuario.save();

    res.json({
        usuario
    })
}
const usuariosPut = async(req, res) => {
    const id = req.params;
    const { _id, password, correo, google, ...resto } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password.toString(), salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        message: 'put API',
        usuario
    })
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado:false } );

    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}