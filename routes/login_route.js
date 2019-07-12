const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    message = req.session.message;
    req.session.message = '';
    return res.render('login.ejs', {
        message: message
    });
});

module.exports = router;