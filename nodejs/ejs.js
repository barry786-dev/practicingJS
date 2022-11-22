const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  console.log('body:', req.body);
  const { message } = Object.keys(req.body).length
    ? req.body
    : { message: 'unknown' };
  console.log('message:', message);
  res.render('index', { message });
});

const server = app.listen(3000, () => {});
