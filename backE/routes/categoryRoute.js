const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const upload = require('../upload')


const router = require('express').Router()

router.route('/category')
  .get(categoryCtrl.getCategory)
  .post(categoryCtrl.createCategory)


router.post('/user-profile', upload.single("image"), categoryCtrl.uploadImg)


router.get('/', categoryCtrl.getUpload)
 

router.route('/category/:id')
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.deleteCategory)


module.exports = router 