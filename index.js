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

const PORT = process.env.PORT || 5000;

// app.get('pass',(req,res) => {
//  <処理（別jsファイルでの処理を挟むか、ここでrenderする変数の処理をする）>
//  res.render('ejsファイル',{
//  仮変数: 中身
//})
//})

app.get('/', (req, res) => {
  console.log(req.session.message);
  console.log(req.session.pass);
  res.render('index.ejs', {
    title: 'Test',
    content: 'This page is Test page!!'
  });
});

app.get('/login', (req, res) => {
  req.session.message = 'hogehogeしようぜ!'
  res.render('login.ejs', {
    hoge: req.session.message
  });
});

app.get('/form', (req, res) => {
  req.session.pass = 'ここはformだ!'
  res.render('form.ejs', {
    hugaaa: req.session.pass
  });
});

app.listen(PORT,() => {
  console.log('start server port:5000')
});
