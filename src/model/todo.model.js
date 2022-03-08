const mongoose = require('mongoose')
const createError = require('http-errors')


const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
})

const todoSchema = mongoose.model('lists', schema);
module.exports = todoSchema;