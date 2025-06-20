const Item = require("../models/item");
exports.createItem = async (req, res) => {
  console.log("received item:", req.body);
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("Create item error:", err.message);  // ✅ Add error details
    res.status(400).json({ error: 'Create failed', details: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};
exports.index = async (req, res) => {
  try {
    const query = { show: true };

    if (req.query.category) {
      query.type = req.query.category;
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err); // ✅ See real error
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};


exports.getById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid item ID' });
  }
};