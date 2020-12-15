'use strict';

// 3rd Party Resources
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Pull in the Routes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  server: app,
  start: port => { // Takes port from index.js, starts server.
    if(!port) { throw new Error('missing port');}
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  },
};