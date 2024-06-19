
(function () {
    // 定义数据库信息对象
    const db_info = {
        url: 'localhost',
        //username: '<DB_USERNAME>', // 如果你的 MongoDB 不需要用户名，请注释掉这一行
        //password: '<DB_PASSWORD>', //if password is not required for you mongodb, comment it
        port: '27017',
        database: 'cs5003P3Group07',
        collections: ["users", "activities", "comments", "userJoinActivity", "calendar"]
    };

    const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;//用不用写这个？
}());
