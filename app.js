//################
//# module読み込み
//################

const express = require('express');
const createError = require('http-errors');
const app = express();
const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);

// DB
const pg = require("pg");
const config = require("config");
const pool = new pg.Pool(config.db.postgres);

//session
const session = require('express-session');
const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// publicフォルダ読み込み
app.use(express.static('public'));

//共通の処理
const common = require("./common.js");

const PORT = process.env.PORT || 5000;

//###########
//# routing 
//###########

// login 
app.get('/login', (req, res) => {
  message = req.session.message;
  req.session.message = '';
  return res.render('login.ejs', {
    message: message
  });
});

// sign-in
app.post('/signIn', (req, res) => {
  //入力チェック
  if (!common.isHalfWidthCharacters(req.body.userId) || !common.isHalfWidthCharacters(req.body.password)) {
    req.session.message = 'Please type using half-width characters.';
    return res.redirect('/');
  };

  let sql = `SELECT * FROM tb_users WHERE user_id = \'${req.body.userId}\' AND password = \'${req.body.password}\'`;
  pool.connect((err, client, done) => {
    client.query(sql)
    .then(result => {
      if (result.rowCount == 0) {
        req.session.message = 'There was a problem with your login.';
        return res.redirect('/login');
      } else {
        req.session.userId = req.body.userId;
        req.session.password = req.body.password;
        return res.redirect('/');
      };
    })
    .catch(err => console.error(err));  
  });
});

// sign-up
app.get('/sign_up', (req, res) => {
  return res.render('sign_up.ejs', );
});


// index 
app.get('/', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    return res.redirect('/login');
  }
  return res.render('index.ejs', {
    userId: req.session.userId
  });
});

// form 
app.get('/form', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    return res.redirect('/login');
  }
  return res.render('form.ejs');
});




//TODO not foundページ作成
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});