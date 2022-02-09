const productCtrl = require('../controllers/ProductCtrl')
const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const upload = require('../uploadProduct')


router.route('/product')
  .get(productCtrl.getProducts) 
  .post(upload.single('image'), productCtrl.createProduct)
  

router.route('/product/:id')
  .put( productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct)

  
      
module.exports = router