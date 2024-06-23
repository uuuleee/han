

const axios = require('axios');

exports.getProductInfo = async (req, res) => {
    const { barcode } = req.params;
    console.log("did recieve params", barcode);
    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product information', details: error.message });
    }
};


// exports.getProductImage = async (req, res) => {
//     const { barcode } = req.params;
//     const imageUrl = `https://images.openfoodfacts.org/images/products/${barcode}.jpg`;

//     try {
//         await axios.head(imageUrl); // 检查图片是否存在
//         res.json({ imageUrl });
//     } catch (error) {
//         res.status(404).json({ error: 'Image not found', details: error.message });
//     }
// };
