const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reviewSchema = new Schema(
  {
    author: { 
        type: mongoose.schema.types.ObjectId,
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



module.exports = mongoose.model('Item', itemSchema);