const express = require('express');
const router  = express.Router();
const Item    = require('../models/item'); 


router.get('/', async (req, res) => {
  try {
    const filter = req.query.category
      ? { type: req.query.category }           
      : {};

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);                      
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;