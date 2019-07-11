const express = require('express');
const ejs = require('ejs');

const app = express();
app.engine('ejs', ejs.renderFile);

const PORT = process.env.PORT || 5000;
app.get('/',(req,res) => {
  res.send('Welcome to Express')
});

app.get('/test', (req, res) => {
  res.render('test.ejs',
    { title: 'Test',
      content: 'This page is Test page!!'
  });
})

app.listen(PORT,() => {
  console.log('start server port:5000')
});
