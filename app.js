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


app.get('/', (req, res) => {
  if (common.checkSesson(req,res)) {
    res.render('index.ejs', {
      title: 'Test',
      content: 'This page is Test page!!'
    });
  } else {
    req.session.name = 'hoge';
    req.session.password = 1234;
    res.render('login.ejs', {
      id: 'google'
    });
  }
});

app.get('/login', (req, res) => {
  res.render('login.ejs', {
    id: 'google'
  });
});

app.get('/form', (req, res) => {
  if (common.checkSesson(req, res)) {
    res.render('form.ejs', {
      title: 'Test',
      content: 'This page is form page!!'
    });
  } else {
    req.session.name = 'hoge';
    req.session.password = 1234;
    res.render('login.ejs', {
      id: 'google'
    });
  }
});

app.listen(PORT,() => {
  console.log('start server port:5000')
});