const axios = require('axios');

// 获取特定产品的基本信息
exports.getProductInfo = async (req, res) => {
    const { barcode } = req.params;
    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product information', details: error.message });
    }
};

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
