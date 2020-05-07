const { Schema, model} = require('mongoose')


// esquema de datos para la aplicacion
const schema =  new Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sorting: {
        type: Number,
        default: 0
    }

})

module.exports = model('task', schema)