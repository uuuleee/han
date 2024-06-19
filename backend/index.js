
// const express = require('express');
// const app = express();
// // import router from './router';//这个是啥
// const cors = require('cors');
// app.use(cors());// 允许所有来源的跨域请求
// // app.use(express.json());//这个是啥
// const port = 3000;
// const OpenFoodFacts = require('openfoodfacts-nodejs');
// const client = new OpenFoodFacts();

// // 设置自定义 User Agent
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
// //监听指定的端口
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });

// // client.getProduct("5000112546415").then((product) => {
// //     console.log(product);
// // });

// // mongoose.connect('mongodb://localhost:27017/studentbili,{
// //     useNewUrlParser:true,
// //     useFindAndModify:true,
// //     useCreateIndex:true
// //     });

// // const Student = mongoose.model('student',new mongoose.Schema({
// //     fsnumber:{type:string),
// //     number:{type:string),
// //     }))
