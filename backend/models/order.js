const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema=new Schema({
  itemId:{
    type:Schema.Types.ObjectId,
    ref:"Item",
    required:true
  },
  name:{type:String},
  price:{type:Number},
   quantity:{
        type:Number,
      default:1},
})


const orderSchema = new Schema(
  {
    buyerId: { 
        type: Schema.Types.ObjectId,
         required: true,
        ref:"User" },
    items: [orderItemSchema],
    paid: {
      type: Boolean,
      default: false,
    },

    totalItemsCost:{
        type:Number,
      default:0},
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.getBasket=async function (userId){
  let basket=await this.findOne({user:userid, paid:false});
  if (!basket){
    basket=await this.create({user:userId, items:[], total:0})
  }
  return basket;
}
orderSchema.methods.calculateTotal=function(){
  this.total=this.items.reduce(
    (sum, item)=>sum+item.price*item.quantity, 0);
    return this.total;
}

module.exports = mongoose.model('Order', orderSchema);