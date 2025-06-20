const Order = require("../models/order");
const Item = require("../models/item");
// const sendEmail=require('../utils/sendEmail') 
// const sendToGoogleSheet=require('../utils/sendToGoogleSheet')
// await sendToGoogleSheet(basket);
module.exports = {
  addToBasket,
  getBasket,
  checkout,
};

async function getBasket(req, res) {
  let basket;
  try {
    basket = await Order.getBasket(req.user._id);
    res.status(200).json(basket);
  } catch (err) {
    console.error("Error fetching basket:", err);
    res.status(500).json({ error: "Failed to fetch basket" });
  }
}

async function addToBasket(req, res) {
  let basket;
  try {
    const { itemId, qty = 1 } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    basket = await Order.getBasket(req.user._id);
    await basket.addItem(itemId, item, qty); 
    await basket.calculateTotal();
    await basket.save();
// await sendToGoogleSheet(basket);
// await sendConfirmationEmail(req.user.email, basket);
   console.log("Basket for user:", basket);
    res.status(200).json({
      msg: "Item added to basket",
      orderId: basket._id,
      items: basket.items,
      total: basket.total,
      date: basket.updatedAt,
    });
  } catch (err) {
    console.error("Error adding to basket:", err);
    res.status(500).json({ error: "Failed to add to basket" });
  }
}

async function checkout(req, res) {
  let basket;
  try {
    basket = await Order.getBasket(req.user._id);

    console.log("User ID:", req.user._id);
    console.log("Basket items:", basket.items); 

    if (!basket.items.length) {
      return res.status(400).json({ msg: "Basket is empty" });
    }

    // Mark as paid
    basket.paid = true;
    await basket.calculateTotal();
    await basket.save();

    // Optionally: send to Google Sheet / Email
    // await sendToGoogleSheet(basket);
    // await sendConfirmationEmail(req.user.email, basket);

    res.status(200).json({
      msg: "Order completed",
      orderId: basket._id,
      items: basket.items,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
}
