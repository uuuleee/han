// const OpenFoodFacts = require('openfoodfacts-nodejs');
// const client = new OpenFoodFacts();
// 设置自定义 User Agents
// client.setCustomUserAgent("MyApp");
// // 定义 API 路由
// app.get('/api/v2/product/:barcode', async (req, res) => {
//     try {
//         const product = await client.getProduct(req.params.barcode);
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching product data' });
//     }
// });