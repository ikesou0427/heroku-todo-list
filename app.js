const express = require('express');
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

// app.get('pass',(req,res) => {
//  <処理（別jsファイルでの処理を挟むか、ここでrenderする変数の処理をする）>
//  res.render('ejsファイル',{
//  仮変数: 中身
//})
//})

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
    res.render('/login');
  }
  res.render('form.ejs');
});









app.listen(PORT,() => {
  console.log('start server port:5000')
});