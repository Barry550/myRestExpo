const multer = require('multer')
const {uuid} = require('uuidv4')

const DIR = "./public/category"

var maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    // cb(null, uuid() + '-' + fileName)
    cb(null, Date.now() + file.originalname)
  },
  onFileUploadStart: function(file, req, res){
    if(req.files.file.length > maxSize) {
      return console.log("la taille est trop grande")
    }
  }

})

upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) =>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null, true)
    } else{
      cb(null, false)
      return cb(new Error("Only .png, .jpg and jpeg format allowed"))
    }
  }
})

module.exports = upload

