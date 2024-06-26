const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');
// GET请求处理特定产品的基本信息
router.get('/product/:barcode', searchController.getProductInfo);

// GET请求处理特定产品的知识面板数据
// router.get('/product/:barcode?fields=knowledge_panels', searchController.getKnowledgePanel);

module.exports = router;