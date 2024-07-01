const axios = require('axios');
// const Products = require('../models/product');

// router.get('/products/:barcode', async (req, res) => {
//     const barcode = req.params.barcode;

//     try {
//         const product = await Product.findOne({ code: barcode });
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


router.get('/products', async (req, res) => {
    try {
        const response = await axios.get('https://world.openfoodfacts.org/api/v2/search', {
            params: {
                page_size: 20,
                sort_by: 'nova_score,nutriscore_score' // 按照NOVA和Nutri-Score排序
            }
        });
        const products = response.data.products;
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
module.exports = router;
// 获取特定产品的基本信息
// exports.getProductInfo = async (req, res) => {
//     const { barcode } = req.params;
//     try {
//         const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch product information', details: error.message });
//     }
// };

// GET /api/products 获取所有产品
// router.get('/products', async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// 其他路由和操作


// 获取特定产品的知识面板数据
// exports.getKnowledgePanel = async (req, res) => {
//     const { barcode } = req.params;
//     try {
//         const response = await axios.get(`https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=knowledge_panels`);
//         const productData = response.data.product.knowledge_panels;
//         res.json(productData);

//     } catch (error) {
//         console.error('Error fetching knowledge panels:', error);
//         res.status(500).json({ error: 'Failed to fetch knowledge panels' });
//     }
// };
