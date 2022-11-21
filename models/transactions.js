const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const transactionSchema = Schema(
  {
    blockNumber: {
      type: Number,
      required: [true, 'Block number of transaction is unknown'],
      index: -1,
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction id of transaction is unknown'],
    },
    senderAddress: {
      type: String,
      required: [true, 'Sender address of transaction is unknown'],
    },
    recipientsAddress: {
      type: String,
      required: [true, 'Recipients address of transaction is unknown'],
    },
    blockConfirmations: {
      type: Number,
      required: [true, 'Block Confirmations of transaction is unknown'],
    },
    date: {
      type: String,
      required: [true, 'Date of transaction is unknown '],
    },
    value: {
      type: Number,
      required: [true, 'Value of transaction is unknown'],
    },
    transactionFee: {
      type: Number,
      required: [true, 'Transaction fee is unknown'],
    },
    blockHash: {
      type: String,
      required: [true, 'Block hash of transaction is unknown'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

transactionSchema.plugin(mongoosePaginate)

const Transaction = model('transaction', transactionSchema)
Transaction.paginate().then({})
module.exports = Transaction
