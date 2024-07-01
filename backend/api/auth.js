const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 注册新用户
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: '用户名已存在' });
        }

        // Create new user
        user = new User({ username, email, password });

        // Save user to database
        await user.save();

        res.json({ msg: '注册成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服务器错误');
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: '用户不存在' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: '密码错误' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'your_jwt_secret', // Replace with your actual JWT secret
            { expiresIn: 3600 }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服务器错误');
    }
});

module.exports = router;