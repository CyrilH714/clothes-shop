const Order=require( "../models/Order");
const Item=require( "../models/item");

module.exports={addToBasket, getBasket, checkout};

async function addToBasket(req, res){
    const userId=req.user._id;
    const {itemId, quantity=1}=req.body;
    const basket=await Order.getBasket(userId);
    const item=await Item.findById(itemId);
    if(!item) return res.status(404).json({message:"Item not found"});
    const existing=basket.items.find(item=>item.productId.equals(itemId));
    if (existing){
        existing.quantity+=quantity
    } else{
        basket.items.push({
              productId: itemId,
      name: item.name,
      price: item.price,
      quantity,
        })
    }
basket.calculateTotal();
  await basket.save();
  res.json(basket);
};

async function getBasket(req,res){
    const basket=await Order.getBasket(req.user._id);
    res.json(basket);
}

async function checkout (req,res){
const basket = await Order.getBasket(req.user._id);
  if (!basket.items.length) {
    return res.status(400).json({ msg: 'Basket is empty' });
  }
  // Payment integration?
  basket.paid = true;
  await basket.save();
  res.json({ msg: 'Order completed', orderId: basket._id });
};