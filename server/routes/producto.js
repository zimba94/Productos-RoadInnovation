const express = require("express");
let { verificaToken } = require("../middlewares/autenticacion");
const _ = require('underscore');
let app = express();

let Producto = require("../models/producto");




//============================
//Mostrar todos los productos
//============================

app.get('/producto', (req, res) => {



    Producto.find({ disponible: true })
        .select(['nombre', 'codigo', 'sku'])
        .sort('nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    registros: conteo
                });

            });
        });

});

//============================
//Mostrar una producto por ID
//============================

app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado (id incorrecto)'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });

});


//============================
//Crear nueva producto
//============================

app.post('/producto', verificaToken, (req, res) => {
    //req.usuario._id

    let body = req.body;


    let producto = new Producto({
        nombre: body.nombre,
        codigo: body.codigo,
        sku: body.sku,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

//============================
//Actualiza producto por id
//============================

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria', 'disponible']);

    // let body = req.body;
    // let descCategoria = {
    //     descripcion: body.descripcion
    // };

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });

    });

});


module.exports = app;