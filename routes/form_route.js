const express = require('express');
const router = express.Router();

// form page
router.get('/', (req, res) => {
    if (!common.checkSignIn(req, res)) {
        return res.redirect('/login');
    }
    return res.render('form.ejs');
});

module.exports = router;