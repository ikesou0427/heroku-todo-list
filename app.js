//################
//# module読み込み
//################

const express = require('express');
const createError = require('http-errors');
const app = express();
const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);

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
const common = require("./common");

const PORT = process.env.PORT || 5000;

//###########
//# routing 
//###########

const indexRouter = require('./routes/index_route');
const loginRouter = require('./routes/login_route');
const mainRouter = require('./routes/main_route');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);


//TODO not foundページ作成
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});
