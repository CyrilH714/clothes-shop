require('dotenv').config();  
const mongoose = require('mongoose');
const Item  = require('./backend/models/item');
       


const data = [
    {
        "name": "LV Patterned Jacket",
        "type": "outerwear",
        "brand": "Louis Vuitton",
        "about": "A designer varsity jacket with monogram patches and iconic motifs.",
        "price": 850.00,
        "stock": 2,
        "size": "L",
        "condition": "Like new",
        "imageURL": "/images/outerwear/outerwear_lv.png",
        "reviews": [],
    },
    {
        "name": "Canada Goose Parka",
        "type": "outerwear",
        "brand": "Canada Goose",
        "about": "Heavy-duty black parka with fur-lined hood for extreme weather.",
        "price": 950.00,
        "stock": 1,
        "size": "M",
        "condition": "New",
        "imageURL": "/images/outerwear/outerwear_canadagoose.png",
        "reviews": [],
    },
    {
        "name": "Christian Dior Monogram Skirt",
        "type": "skirt",
        "brand": "Christian Dior",
        "about": "Signature Dior monogram mini skirt with stretch waistband.",
        "price": 620.00,
        "stock": 3,
        "size": "S",
        "condition": "Gently used",
        "imageURL": "/images/skirts/skirt_cd.png",
        "reviews": [],
    },
    {
        "name": "Pleated Black Skirt",
        "type": "skirt",
        "brand": "Louis Vuitton",
        "about": "Simple yet elegant black pleated skirt.",
        "price": 480.00,
        "stock": 4,
        "size": "M",
        "condition": "Worn",
        "imageURL": "/images/skirts/skirt_lv.png",
        "reviews": [],
    },
    {
        "name": "Gucci Tweed Jacket",
        "type": "top",
        "brand": "Gucci",
        "about": "Textured cropped tweed jacket with signature GG pattern.",
        "price": 1100.00,
        "stock": 2,
        "size": "M",
        "condition": "Like new",
        "imageURL": "/images/tops/top_gucci.png",
        "reviews": [],
    },
    {
        "name": "LV Gradient T-Shirt",
        "type": "top",
        "brand": "Louis Vuitton",
        "about": "Gradient black t-shirt with signature monogram pattern.",
        "price": 450.00,
        "stock": 5,
        "size": "L",
        "condition": "Like new",
        "imageURL": "/images/tops/top_lv.png",
        "reviews": [],
    },
    {
        "name": "Red Silk Evening Dress",
        "type": "dress",
        "brand": "Vivienne Westwood",
        "about": "Elegant red silk evening gown with cutout waist.",
        "price": 980.00,
        "stock": 1,
        "size": "M",
        "condition": "Worn",
        "imageURL": "/images/dresses/dress_vw.png",
        "reviews": [],
    },
    {
        "name": "Sequinned Nude Dress",
        "type": "dress",
        "brand": "Prada",
        "about": "Sheer nude midi dress adorned with subtle sequins.",
        "price": 1200.00,
        "stock": 1,
        "size": "S",
        "condition": "New",
        "imageURL": "/images/dresses/dress_prada.png",
        "reviews": [],
    },
    {
        "name": "Hermès Silk Twilly Scarf",
        "type": "accessory",
        "brand": "Hermès",
        "about": "Printed silk Twilly scarf in orange with equestrian illustrations.",
        "price": 180.00,
        "stock": 2,
        "size": "One size",
        "condition": "New",
        "imageURL": "/images/accessories/accessory_hermes.png",
        "reviews": [],
    },
    {
        "name": "Hermès Rodeo Charm",
        "type": "accessory",
        "brand": "Hermès",
        "about": "Leather horse-shaped bag charm from the Rodeo collection.",
        "price": 250.00,
        "stock": 1,
        "size": "One size",
        "condition": "New",
        "imageURL": "/images/accessories/accessory_hermes_2.png",
        "reviews": [],
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