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
  res.render('login.ejs', {
    message: ''
  });
});

// sign-in
app.post('/signIn', (req, res) => {
  // todo xss対策
  let sql = `SELECT * FROM tb_users WHERE user_id = \'${req.body.userId}\' AND password = \'${req.body.password}\'`;
  pool.connect((err, client, done) => {
    client.query(sql, param, (err, result) => {
      done();
      err && console.error(err);
      if (result.rowCount == 0) {
        app.get('/login', (req, res) => {
          res.render('login.ejs', {
            message: 'There was a problem with your login.'
          });
        });
      } else {
        req.session.userId = req.body.userId;
        req.session.password = req.body.password;
        res.redirect('/');
      };
    });
  });
});

// index 
app.get('/', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    res.redirect('/login');
  }
  res.render('index.ejs', {
    userId: req.session.userId
  });
});

// form 
app.get('/form', (req, res) => {
  if (!common.checkSignIn(req, res)) {
    res.redirect('/login');
  }
  res.render('form.ejs');
});



//TODO not foundページ作成
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});