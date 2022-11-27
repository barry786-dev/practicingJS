const express = require('express');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

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
  res.send(` <h1>Hello ${message}</h1>
    <form action="" method="POST">
      <input type="text" name="message" />
      <button type="submit">Send</button>
    </form>`);
});

// GET request to /favicon.ico -- browser make GET requests by default
app.get('/favicon.ico', (req, res) => {
    res.status(200).send('ok');
});

const server = app.listen(3000, () => {});
