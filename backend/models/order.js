const Schema = mongoose.Schema;



const orderSchema = new Schema(
  {
    buyerId: { 
        type: mongoose.schema.types.ObjectId,
         required: true },
    itemId: {
      type: mongoose.schema.types.ObjectId,
      required: true,
    },
    status: {
      enum:["Pending","Ordered"],
      required: true,
    },
    quantity:{
        type:Number,
        required:true},

    totalItemsCost:{
        type:Number,
        required:true,},
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('Order', orderSchema);