const express = require('express');
const router = express.Router();

const common = require("../common");

// main page
router.get('/', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    return res.render('main.ejs', {
        userId: req.session.userId
    });
});


module.exports = router;