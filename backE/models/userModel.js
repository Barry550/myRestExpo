const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    maxlength: 1024,
    minlength: 6,
    required: true
  },
},
{
  timestamps: true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
















// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const {isEmail} = require('validator')

// const SchemaUser = new mongoose.Schema(
//   {   
//     email: {
//       type: String,
//       required: true,
//       validate: [isEmail],
//       lowercase: true,
//       trim: true,  
//     },

//     password: {
//       type: String,
//       required: true,
//       max: 1024,
//       minlength: 6
//     },

//     role: {
//       type: Number,
//       default: 0
//     },

//   },
//   {
//     timestamps: true
//   }
// )

// SchemaUser.pre('save', async function(next){
//   const salt = await bcrypt.genSalt()
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

// SchemaUser.statics.login = async function(email, password){
//   const user = await this.findOne({email})
//   if(user){
//     const auth = await bcrypt.compare(password, user.password)
//     if(auth){
//       return user
//     }
//     throw Error('Password incorrect')
//   }
//   throw Error("Email incorrect") 
// }

// module.exports = mongoose.model('user', SchemaUser)