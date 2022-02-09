const categoryModel = require('../models/categoryModel')
const productModel = require('../models/productModel')
const multer = require('multer')


const categoryCtrl = {
  uploadImg: (req, res, next)=> {
    const url = req.protocol + '://' + req.get('host')
    const category = new categoryModel({
      image: url + '/public/category/' + req.file.originalname,
      name: req.body.name
    })

    console.log("req: ", req.file);
    category.save().then(result => {
      res.status(201).json({
        message: "User registered successfully",
        categoryCreated:{
          _id: result._id,
          name: result.name,
          image: result.image
        } 
      })
    }).catch(err =>{
      console.log(err),
      res.status(500).json({
        error: err
      })
    })
  },

  getUpload: (req, res, next)=>{
    categoryModel.find().then(data => {
      res.status(200).json({
        message: "categories list retrieved successfully",
        category: data
      })
    })
  },

  getCategory: async (req, res) =>{
    try {  
      const categories = await categoryModel.find().sort({createdAt: -1})
      if(categories){
        res.json(categories)
      }
    } catch (err) {
      return res.status(400).json({msg: err.message})
    }
  },

  createCategory: async (req, res) =>{
    try {
      const {name, image} = req.body
      console.log("file: ", req.files)
      const category = await categoryModel.findOne({name})
      if(category) return res.json({msg: "cette catégorie existe déjà"})
      const newCategory = new categoryModel({
        name,
        image
      })

      await newCategory.save((err, data)=>{
        if(err) throw err
        res.json(data)
      })
  
   
    } catch (err) { 
     return res.status(400).json({msg: err.message})   
    }
  },
  deleteCategory: async (req, res) =>{
    try {
      const products = await productModel.findOne({category: req.params.id})
      if(products) return res.status(400).json({msg: "Please delete all products with a relationship"})
      await categoryModel.findByIdAndDelete(req.params.id)
      res.json({msg: "Catégorie supprimé"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },

  updateCategory: async (req, res) =>{
    try {
      const {name} = req.body
      await categoryModel.findOneAndUpdate({_id: req.params.id},
        {
          name
        },
        {new: true},
        (err, data)=>{
          if(err) throw err

          res.json(data)
        })
      // res.json({msg: "Updated category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  }

  // updateCategory: async (req, res)=>{
  //   try {
      
  //    await categoryModel.findByIdAndUpdate(
  //       req.params.id,
  //       {$set: { name: req.body.name}},
  //       {new: true},
  //       (err, data)=>{
  //         res.json(data)
  //       })
        

  //   // const {name} = req.body
  //   //   await categoryModel.findByIdAndUpdate({_id: req.params.id}, {name})
  //   //   res.json({msg: "Updated category"})
  //   } catch (err) {
  //     return res.status(400).json({msg: err.message})
  //   }
  // },

  // deleteCategory: async(req, res) =>{
  //   try {

  //   await categoryModel.deleteOne({_id:req.params.id}).exec()
  //     res.json({msg: "delete category"})
  //   } catch (err) {
  //     return res.status(400).json({msg: "Please delete all products with a relationship"})
  //   }
  // }
}

module.exports = categoryCtrl