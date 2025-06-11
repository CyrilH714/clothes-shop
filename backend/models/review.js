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

userSchema.pre('save', async function (next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

module.exports = mongoose.model('Review', reviewSchema);