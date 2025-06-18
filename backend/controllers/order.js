const Order=require( "../models/order");
const Item=require( "../models/item");

module.exports={addToBasket, getBasket, checkout};

async function addToBasket(req, res) {
  try {
    const item = await Item.findById(itemId);
if (!item) return res.status(404).json({ message: 'Item not found' });

const basket = await Order.getBasket(req.user._id);
await basket.addItem(itemId, item); // Prevents duplicate inside method
res.json(basket);
  } catch (err) {
    console.error("Error adding to basket:", err);
    res.status(500).json({ error: "Failed to add to basket" });
  }
}

async function getBasket(req, res) {
  try {
    const basket = await Order.getBasket(req.user._id);
    res.status(200).json(basket);
  } catch (err) {
    console.error("Error fetching basket:", err);
    res.status(500).json({ error: "Failed to fetch basket" });
  }
}

async function checkout(req, res) {
  try {
    const basket = await Order.getBasket(req.user._id);

    if (!basket.items.length) {
      return res.status(400).json({ msg: "Basket is empty" });
    }
// payment integration?
    basket.paid = true;
    await basket.save();

    res.status(200).json({
      msg: "Order completed",
      orderId: basket._id,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
}