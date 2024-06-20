
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');//这是引入user还是auth

// 注册新用户
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 检查用户名是否已存在
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: '用户名已存在' });
        }

        // 创建新用户
        user = new User({ username, password });

        // 保存用户到数据库
        await user.save();

        res.json({ msg: '注册成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服务器错误');
    }
};

// 用户登录
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 检查用户是否存在
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: '用户不存在' });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: '密码错误' });
        }

        // 生成 JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'your_jwt_secret', // 替换为你的实际 JWT 密钥
            { expiresIn: 3600 }, // Token 有效期1小时
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服务器错误');
    }
};
