const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const ObjectId = require('mongoose').Types.ObjectId

// const APIfeatures = () => 

class APIfeatures{
  constructor(query, queryString){
    this.query = query,
    this.queryString = queryString
  }

  filtering(){
    const reqQuery = {...this.queryString}

    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|regex)\b/g, match => `$${match}`);

    this.query.find(JSON.parse(queryStr))
    return this
  }

  selecting(){
    if (this.queryString.select) {
      const fields = this.queryString.select.split(',').join(' ');
      this.query.select(fields);
    }

    return this
  }

  sorting(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortBy);
  } else {
      this.query.sort('-createdAt');
  }
    return this
  }

  pagination(){
    const page = this.queryString * 1 || 1
    const limit = this.queryString * 1 || 50
    const skip = (page - 1) * limit
    this.query.skip(skip).limit(limit)
    return this
  }
}

const productCtrl = {
  getProducts: async (req, res) =>{
    try {
      const features = await new APIfeatures(productModel.find(), req.query).filtering().selecting().sorting().pagination()
      const products = await features.query

      res.json({result: {
        status: "success",
        result: products.length,
        products: products
      }})
    } catch (err) {
      return res.status(400).json({msg: err.message})
    }   
  },

  getOneProduct: async(req, res) =>{
    try {
  const product = await productModel.findById(req.params.id)

  res.json({product})
    } catch (err) {
      return res.status(400).json({msg: err.message})
    }
  },

  createProduct:async (req, res) =>{
    try {

      const {ref, ingredients, image, sold, price, category } = req.body

    //  if(!image) return res.json({msg: "No image upload"})
      const produc = await productModel.findOne({ref})
      if(produc) 
          return res.json({msg: "this product already exists"})

      const url = req.protocol + '://' + req.get('host')
      const newProduct = new productModel({
        ref,
        ingredients,
        image: url + '/public/product/' + req.file.originalname,
        category,
        price,
      }) 

      const product = await newProduct.save()
      res.json({product})
    } catch (err) {
      return res.status(400).json({msg: err.message})
    }
  },

  updateProduct:async (req, res) =>{
    try {
 

       await productModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ingredients: req.body.ingredients, 
            image: req.body.image,
            price: req.body.price, 
            category: req.body.category
          },
        },
        {new: true},
        (err, data)=>{

          if(err) throw err
          res.json({product: data})
        }
      )

    } catch (err) {
      return res.status(400).json({msg: err.message})
    }
  },

  deleteProduct: async (req, res) =>{
    try {
    await  productModel.remove({_id: req.params.id}).exec()

      res.json("delete")
    } catch (err) {
      return res.status(400).json({msg: err.message})
    }
  },
}

module.exports = productCtrl