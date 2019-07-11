var express = require('express');
var app = express();

const PORT = process.env.PORT || 5000;
app.get('/',(req,res) => {
  res.send('Welcome to Express')
});

app.get('/test', (req, res) => {
  res.render('test.ejs');
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});
