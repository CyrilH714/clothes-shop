const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reviewSchema = new Schema(
  {
    author: { 
        type:Schema.Types.ObjectId,
         required: true },
    message: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const itemSchema = new Schema(
  {
    name: { 
        type: String,
         required: true },
    type: {
      type:String,
enum:["dress","top","skirt","outerwear","accessory"],      
required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    about:{
        type: String,
        required: false,
    },
    price:{
        type:Number,
        required: true,
  },
  stock:{
    type:Number,
    required:true,
  },
  size:{
    type:String,
    required:false,
},
condition:{
  type:String,
    enum:["Not worn","Lightly used", "Very used"],
    required:false,
},
imageURL:{
    type:String,
required:true,}
  ,
 reviews:{
    type:[reviewSchema],},
 },{
    timestamps: true,
  }
);

itemSchema.virtual("isAvailable").get(function(){
  return this.stock>0;
})
itemSchema.methods.decrementStock=function (qty=1){
  this.sick=Math.max(0,this.stock-qty);
  return this.save();
}

module.exports = mongoose.model('Item', itemSchema);