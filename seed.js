require('dotenv').config();  
const mongoose = require('mongoose');
const Item  = require('./backend/models/item');
       


const data=[
    {
    name: "Floral Summer Dress",
    type: "dress",
    brand: "Zara",
    about: "A light, breezy dress perfect for warm weather.",
    price: 49.99,
    stock: 10,
    size: "M",
    condition: "Lightly used",
    imageURL: "https://example.com/image1.jpg",
    reviews: [],
  },
  {
    name: "Wool Winter Coat",
    type: "outerwear",
    brand: "Uniqlo",
    about: "Warm and stylish coat with wool blend.",
    price: 129.99,
    stock: 5,
    size: "L",
    condition: "Not worn",
    imageURL: "https://example.com/image2.jpg",
    reviews: [],
  },
  {
    name: "Silk Scarf",
    type: "accessory",
    brand: "Hermès",
    about: "Luxurious silk scarf with printed detail.",
    price: 199.00,
    stock: 3,
    size: "One size",
    condition: "Not worn",
    imageURL: "https://example.com/image3.jpg",
    reviews: [],
  },
]
async function seedDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in your .env file");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    await Item.deleteMany({});
    const items = await Item.insertMany(data);
    console.log(`Seeded ${items.length} items`);
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};
seedDB();