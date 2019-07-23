const express = require('express');
const router = express.Router();

const common = require("../common");
const main = require("../public/javascripts/main");

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
    let sql = `
    SELECT contents,attribute 
        FROM todo
        WHERE status != 0
        AND user_id = \'${req.session.userId}\';`
    
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                console.log(result);
                let m = [], w = [], e = [];
                for (let i = 0; i < result.rowCount; i++){
                    result.rows[i].attribute == 'm'
                        ? m.push(result.rows[i].contents)
                        : (result.rows[i].attribute == 'w'
                            ? w.push(result.rows[i].contents)
                            : e.push(result.rows[i].contents));
                }
                return res.render('main.ejs', {
                    message: message,
                    m: m,
                    w: w,
                    e: e
                });
            })
            .catch(err => {
                console.error(err);
                req.session.message = 'There was a problem with your login.';
                return res.redirect('/login');
            });
    });
});

// register new content
router.post('/new', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    if (!main.checkJaAndEn(req.body.content)) {
        req.session.message = '日本語と半角英数のみを使用してください';
        return res.redirect('/main');
    }

    let sql = `
    INSERT INTO todo (user_id,contents,attribute)
        VALUES (\'${req.session.userId}\',\'${req.body.content}\',\'${req.body.attribute}\');
    `
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                return res.redirect('/main');
            })
            .catch(err => {
                console.error(err);
                req.session.message = 'There was a problem.';
                return res.redirect('/main');
            });
    });
});


module.exports = router;