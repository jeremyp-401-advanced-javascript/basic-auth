'use strict';

// 3rd Party Resources
const express = require('express');
// Make app an instance of Express
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Pull in the Routes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

module.exports = {
  server: app,
  start: port => { // Takes port from index.js, starts server.
    if(!port) { throw new Error('missing port');}
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  },
};