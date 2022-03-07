const mongoose = require('mongoose')
const createError = require('http-errors')

const schema = mongoose.createSchema({
    name: {
        type: String,
        required: true
    },
    description: String,
})

const todoSchema = mongoose.model('lists', schema);
module.exports = todoSchema;