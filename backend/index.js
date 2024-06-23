const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const searchRoutes = require('./routes/searchRoute');
const connectDB = require('./config'); // 确保你的数据库连接函数正确

const app = express();
const port = 3000;

app.use(cors()); // 允许所有来源的跨域请求
app.use(express.json()); // 解析 JSON 请求体

// 连接到 MongoDB 数据库
connectDB();

// 使用路由
app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);

// 监听指定的端口
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
