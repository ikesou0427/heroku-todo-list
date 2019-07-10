var express = require('express');
var app = express();

app.get('/',(req,res) => {
  res.send('Welcome to Express')
});

app.listen(5000,() => {
  console.log('start server port:5000')
});
