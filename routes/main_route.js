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

    // todo:userid check
    let sql = `
    SELECT contents,attribute 
        FROM tb_todo
        WHERE status != 0
        AND user_id = \'${req.session.userId}\';`
    
    pool.connect((err, client, done) => {
        client.query(sql)
            .then(result => {
                console.log(result.rows);
                let m = [], w = [], e = [];
                for (let i = 0; i < result.rowCount; i++){
                    result.rows[i].attribute == 'm'
                        ? m.push(result.rows[i].contents)
                        : (result.rows[i].attribute == 'w'
                            ? w.push(result.rows[i].contents)
                            : e.push(result.rows[i].contents));
                }
                console.log(m,w,e)
                return res.render('main.ejs', {
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


module.exports = router;