const Joi = require('joi')

const schemaGetTransactions = Joi.object({
  currentPage: Joi.number().optional(),
  pageItemsLimit: Joi.number().optional(),
})

const schemaGetTransactionsBySearchParams = Joi.object({
  filter: Joi.string().optional(),
  searchQuery: Joi.string().optional(),
  currentPage: Joi.number().optional(),
  pageItemsLimit: Joi.number().optional(),
})
const schemaGetTransactionsByBlockNumber = Joi.object({
  filter: Joi.string().optional(),
  searchQuery: Joi.number().optional(),
  currentPage: Joi.number().optional(),
  pageItemsLimit: Joi.number().optional(),
})

const validation = (schema, body, next) => {
  const { error } = schema.validate(body)

  if (error) {
    const [{ message }] = error.details

    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateGetTransactions = (req, res, next) => {
  return validation(schemaGetTransactions, req.body, next)
}
module.exports.validateGetTransactionsBySearchParams = (req, res, next) => {
  return validation(schemaGetTransactionsBySearchParams, req.body, next)
}
module.exports.validateGetTransactionsByBlockNumber = (req, res, next) => {
  return validation(schemaGetTransactionsByBlockNumber, req.body, next)
}
