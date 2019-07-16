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
        AND user_id = ${req.session.userId};`
    return res.render('main.ejs', {
    });
});


module.exports = router;