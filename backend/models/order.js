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
},
{
    timestamps: true,
  toJSON: { virtuals: true },   
    toObject: { virtuals: true }, 
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
  toJSON: { virtuals: true },   
    toObject: { virtuals: true }, 
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
orderSchema.virtual("itemCount").get(function(){
  return this.items.reduce((sum,item)=>sm+item.quantity,0)
})
orderSchema.methods.addOrUpdateItem = function (itemId, qty) {
  const row = this.items.find(it => it.productId.equals(itemId));
  row ? (row.quantity += qty) : this.items.push({ productId: itemId, quantity: qty });
};
orderSchema.methods.addItem = async function (itemId, qty = 1) {
  const existing = this.items.find(it => it.productId.equals(itemId));
  if (existing) {
    existing.quantity += qty;
  } else {
    const item = await mongoose.model('Item').findById(itemId);
    if (item) {
      this.items.push({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: qty
      });
    }
  }
  await this.save();
};
orderSchema.virtual('total').get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});
module.exports = mongoose.model('Order', orderSchema);