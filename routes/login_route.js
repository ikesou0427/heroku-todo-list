const express = require('express');
const router = express.Router();

const common = require("../common");

// DB
const pg = require("pg");
const config = require("config");
const pool = new pg.Pool(config.db.postgres);

// login page
router.get('/', (req, res) => {
    message = req.session.message;
    req.session.message = '';
    return res.render('login.ejs', {
        message: message
    });
});

//todo ログイン失敗回数を数えて、制限をかける
// sign-in
router.post('/signIn', (req, res) => {
    //入力チェック
    if (!common.checkInputString(req.body.userId, 3, 10) || !common.checkInputString(req.body.password, 6, 16)) {
        req.session.message = '半角英数のみを使用してください';
        req.session.userId = '';
        req.session.password = '';
        return res.redirect('/login');
    };

    let sql = {
        text: 'SELECT * FROM tb_users WHERE user_id = $1 AND password = $2',
        values: [req.body.userId, req.body.password]
    };
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                done();
                if (result.rowCount == 0) {
                    req.session.message = 'ログイン時にエラーが発生しました';
                    return res.redirect('/login');
                } else {
                    req.session.userId = req.body.userId;
                    req.session.password = req.body.password;
                    return res.redirect('/');
                };
            })
            .catch(err => {
                done();
                console.error(err);
                req.session.message = 'ログイン時にエラーが発生しました';
                return res.redirect('/login');
            });
    });
});

// sign-up
router.get('/sign_up', (req, res) => {
    message = req.session.message;
    req.session.message = '';
    return res.render('sign_up.ejs', {
        message: message
    });
});

// sign-up do
// todo ajaxでuseridが使われているか確認する処理を追加
router.post('/sign_up/do', (req, res) => {
    if (!common.checkInputString(req.body.newUserId, 3, 10) || !common.checkInputString(req.body.newPassword,6,16)) {
        req.session.message = 'Please type using half-width characters.';
        req.session.userId = '';
        req.session.password = '';
        return res.redirect('/login/sign_up');
    };

    let ip_addr = common.getIP(req);

    let sql = {
        text: 'INSERT INTO tb_users (user_id ,password,ip_addr) VALUES ($1 ,$2, $3)',
        values: [req.body.newUserId, req.body.newPassword,ip_addr]
    };
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                done();
                if (result.rowCount > 0) {
                    req.session.userId = req.body.newUserId;
                    req.session.password = req.body.newPassword;
                    return res.redirect('/');
                };
            })
            .catch(err => {
                done();
                console.error(err);
                req.session.message = 'そのユーザーIDはすでに使用されています';
                return res.redirect('/login/sign_up');
            });
    });
});

module.exports = router;