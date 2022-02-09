const mongoose = require('mongoose')

const SchemaProduct = new mongoose.Schema(
  {

    ref:{
      type: String,
      unique: true
    },
    
    name: {
      type: String,
      required: true
    },

    ingredients: {
      type: String,
      required: true,
    },

    image:{
      type: String,
      required: true,
    },

    sold: {
      type: Number,
      default: 0
    }, 

    price: {
      type: Number,
      required: true
    },

    category:{
      type: String,
      required: true,
    }, 

   
    },
    
  {
    timestamps: true
  }
)

module.exports = mongoose.model('product', SchemaProduct)

  