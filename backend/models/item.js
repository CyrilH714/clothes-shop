const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
  show:{
    type:Boolean,
    default:true,
  },
  size:{
    type:String,
    required:false,
},
condition:{
  type:String,
  enum: ['New', 'Like new', 'Gently used', 'Used', 'Worn'], 
   required:true,
},
imageURL:{
    type:String,
required:true,}
  ,
 
 },{
    timestamps: true,
  toJSON: { virtuals: true },   
    toObject: { virtuals: true }, 
  },
  {
    timestamps: true,
  toJSON: { virtuals: true },   
    toObject: { virtuals: true }, 
  }
);


itemSchema.methods.decrementStock=function (qty=1){
  this.sick=Math.max(0,this.stock-qty);
  return this.save();
}

module.exports = mongoose.model('Item', itemSchema);