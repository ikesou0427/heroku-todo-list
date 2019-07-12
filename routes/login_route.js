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

// sign-in
router.post('/signIn', (req, res) => {
    //入力チェック
    if (!common.isHalfWidthCharacters(req.body.userId) || !common.isHalfWidthCharacters(req.body.password)) {
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
    return res.render('sign_up.ejs');
});

// sign-up do
router.post('/sign_up/do', (req, res) => {

});

module.exports = router;