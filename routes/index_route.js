const express = require('express');
const router = express.Router();

// publicフォルダ読み込み
const common = require('../common');

// index page
router.get('/', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    return res.render('index.ejs', {
        userId: req.session.userId
    });
});


module.exports = router;