const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({

  name:{type:String},
  userId:{type:Number},
  NoOfOrders:{type:Number,default:0}
 
  
})


var orderSchema = new mongoose.Schema({
  orderId:{type:Number},
  userId:{type:Number},
  subtotal:{type:Number,default:0},
  date:{type:String, default: new Date()},

})





const user = mongoose.model('user',userSchema)
const order = mongoose.model('order',orderSchema)

module.exports = {user,order}
