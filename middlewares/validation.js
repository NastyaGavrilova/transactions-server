const Joi = require('joi')

const schemaGetTransactions = Joi.object({
  searchQuery: Joi.string().optional(),
  filter: Joi.string().optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
})

const validation = (schema, body, next) => {
  const { error } = schema.validate(body)

  if (error) {
    const [{ message }] = error.details

    return next({
      status: 400,
      message: `Error: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateGetTransactions = (req, res, next) => {
  return validation(schemaGetTransactions, req.body, next)
}
