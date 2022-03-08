const joi = require('@hapi/joi')

exports.createTodo = () => {
  return joi.object({
    name: joi
      .string()
      .min(3)
      .required()
      .messages({
        'string.base': `Title Should be a type of 'text'`,
        'string.min': `Title Should have a minimum length of {#limit}`,
        'any.required': `Title is Required!`
      }),
    description: joi
      .string()
      .min(3)
      .messages({
        'string.base': `Description Should be a type of 'text'`
      })
  })
}

exports.updateTodos = () => {
  return joi.object({
    id:joi
  .string()
  .required(),

  name: joi
    .string()
    .required()
    .messages({
      'string.base': `Title Should be a type of 'text'`,
      'string.min': `Title Should have a minimum length of {#limit}`,
      'any.required': `Title is Required!`
    }),
  description: joi
    .string()
    .min(3)
    .messages({
      'string.base': `Description Should be a type of 'text'`
    })
})

}

exports.deleteTodosById = () => {
  const schema = {
    id: joi.string().required()
  }
  return joi.object({ schema })
}
exports.getTodosById = () => {
  const schema = {
    id: joi.string().required()
  }
  return joi.object(schema)
}
