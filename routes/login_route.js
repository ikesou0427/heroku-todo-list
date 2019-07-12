const express = require('express');
const router = express.Router();

const common = require("../common");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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

// sign-in
router.post('/signIn', (req, res) => {
    //入力チェック
    if (!common.checkInputString(req.body.userId, 3, 10) || !common.checkInputString(req.body.password, 6, 16)) {
        req.session.message = 'Please type using half-width characters.';
        req.session.userId = '';
        req.session.password = '';
        return res.redirect('/login');
    };

    let sql = `SELECT * FROM tb_users WHERE user_id = \'${req.body.userId}\' AND password = \'${req.body.password}\'`;
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                if (result.rowCount == 0) {
                    req.session.message = 'There was a problem with your login.';
                    return res.redirect('/login');
                } else {
                    req.session.userId = req.body.userId;
                    req.session.password = req.body.password;
                    return res.redirect('/');
                };
            })
            .catch(err => console.error(err));
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
router.post('/sign_up/do', (req, res) => {
    if (!common.checkInputString(req.body.userId, 3, 10) || !common.checkInputString(req.body.password,6,16)) {
        req.session.message = 'Please type using half-width characters.';
        req.session.userId = '';
        req.session.password = '';
        return res.redirect('/sign_up');
    };

    let sql = `INSERT INTO tb_users (user_id ,password) VALUES (\'${req.body.userId}\' , \'${req.body.password}\');`;
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                if (result.rowCount > 0) {
                    req.session.userId = req.body.userId;
                    req.session.password = req.body.password;
                    return res.redirect('/');
                };
            })
            .catch(err => console.error(err));
    });
});

module.exports = router;