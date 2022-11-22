const express = require('express');
let cors = require('cors');
const locationRoutes = require('./routes/location');

const app = express();
const whitelist = ['http://localhost:9000', 'http://example2.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
/* app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); */

app.use(locationRoutes);

const server = app.listen(3000, () => {});
