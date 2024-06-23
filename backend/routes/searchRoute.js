// searchRouter.js
const express = require('express');
const { getProductInfo } = require('../controllers/searchController');
const router = express.Router();

router.get('/product/:barcode', getProductInfo);
// router.get('/product/:barcode/image', getProductImage);
module.exports = router;
