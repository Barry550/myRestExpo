const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/restaurant',
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
).then(res => console.log("mongodb connected "))
 .catch(err => console.log(err))