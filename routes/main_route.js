const express = require('express');
const router = express.Router();

const common = require("../common");

// DB
const pg = require("pg");
const config = require("config");
const pool = new pg.Pool(config.db.postgres);


// main page
router.get('/', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    message = req.session.message;
    req.session.message = '';

    // todo:userid check
    let sql = {
        text: 'SELECT id,contents,attribute FROM todo WHERE status != $1 AND user_id = $2',
        values: [0, req.session.userId]
    };
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                done();
                let m = [[], []], w = [[], []], e = [[], []];
                for (let i = 0; i < result.rowCount; i++){
                    if (result.rows[i].attribute == 'm') {
                        m[0].push(result.rows[i].contents);
                        m[1].push(result.rows[i].id);
                    } else if (result.rows[i].attribute == 'w') {
                        w[0].push(result.rows[i].contents);
                        w[1].push(result.rows[i].id);
                    } else {
                        e[0].push(result.rows[i].contents);
                        e[1].push(result.rows[i].id);
                    };
                };
                return res.render('main.ejs', {
                    message: message,
                    m: m,
                    w: w,
                    e: e
                });
            })
            .catch(err => {
                done();
                console.error(err);
                req.session.message = 'ログイン時にエラーが発生しました';
                return res.redirect('/login');
            });
    });
});

// register new content
router.post('/new', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    if (!common.checkJaAndEn(req.body.content)) {
        req.session.message = '日本語と半角英数のみを使用してください';
        return res.redirect('/main');
    }

    let sql = {
        text: 'INSERT INTO todo(user_id, contents, attribute) VALUES($1,$2,$3)',
        values: [req.session.userId, req.body.content, req.body.attribute]
    };
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(() => {
            })
            .catch(err => {
                console.error(err);
                req.session.message = '問題が発生しました';
            });
        done();
        return res.redirect('/main');
    });
});

// change content
router.post('/change', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    };

    let sql = {
        text: 'UPDATE todo SET attribute = $1 WHERE id = $2',
        values: [req.body.attr, req.body.id]
    };
    pool.connect((err, client, done) => {
        let response = 'failure';
        client.query(sql)
            .then(() => {
                response = 'success';
            })
            .catch(err => {
                console.error(err);
            });
        done();
        return res.json(response);
    });
});

// finished content
router.post('/end', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }

    let sql = {
        text: 'UPDATE todo SET status = $1 WHERE id = $2',
        values: [0, req.body.id]
    };

    pool.connect((err, client, done) => {
        let response = 'failure';
        client.query(sql)
            .then(()=> {
                response = 'success';
            })
            .catch(err => {
                console.error(err);
            });
        done();        
        return res.json(response);
    });
});



module.exports = router;