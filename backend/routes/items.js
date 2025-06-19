const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/item');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const isAdmin = require('../middleware/isAdmin');

// Public
router.get('/', itemCtrl.index);
router.get('/:id', itemCtrl.getById);

// Admin 
router.post('/', ensureLoggedIn, isAdmin, itemCtrl.createItem);
router.put('/:id', ensureLoggedIn, isAdmin, itemCtrl.updateItem);
router.delete('/:id', ensureLoggedIn, isAdmin, itemCtrl.deleteItem);

module.exports = router;