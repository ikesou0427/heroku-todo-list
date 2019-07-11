const express = require('express');
const ejs = require('ejs');

const app = express();
app.engine('ejs', ejs.renderFile);

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
  res.send('Welcome to Express')
});

// app.get('pass',(req,res) => {
//  <処理（別jsファイルでの処理を挟むか、ここでrenderする変数の処理をする）>
//  res.render('ejsファイル',{
//  仮変数: 中身
//})
//})

app.get('/test', (req, res) => {
  res.render('test.ejs', {
    title: 'Test',
    content: 'This page is Test page!!'
  });
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});
