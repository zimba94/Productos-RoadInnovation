var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El código es necesario'] },
    codigo: { type: String, required: [true, 'El código es necesario'] },
    sku: { type: String, required: [true, 'El SKU es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio unitario es necesario'] },
    descripcion: { type: String, required: [true, 'La desripción es necesaria'] },
    disponible: { type: Boolean, required: true, default: true },
});


module.exports = mongoose.model('Producto', productoSchema);