const express = require('express');
const createError = require('http-errors');
const app = express();

const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);

const session = require('express-session');
const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

// publicフォルダ読み込み
app.use(express.static('public'));
//共通の処理
const common = require("./common.js");

const PORT = process.env.PORT || 5000;


// login page
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

// index page
app.get('/', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    res.redirect('/login');
  }
  res.render('index.ejs');
});

// form page
app.get('/form', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    res.redirect('/login');
  }
  res.render('form.ejs');
});






//TODO: not foundページ作成
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});