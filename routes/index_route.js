const express = require('express');
const router = express.Router();

const app = express();
// publicフォルダ読み込み
app.use(express.static('public'));
const common = require('../common');


router.get('/', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    return res.render('index.ejs', {
        userId: req.session.userId
    });
});

module.exports = router;