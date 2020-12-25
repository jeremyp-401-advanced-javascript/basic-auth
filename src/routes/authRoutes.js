'use strict';

// 3rd Party Resources
const express = require('express');
const router = express.Router();
const User = require('../auth/userModel');

// Pull in the Middleware
const authMidWare = require('../auth/signInMiddleware');
const notFoundHandler = require('../error-handlers/404');

// Signup Route -- create a new user
router.post('/signup', async function (req, res) {
  try {
    const user = new User(req.body);
    const record = await user.save(req.body);
    //res.status(201).json({ message: `${req.user.username} has successfully signed up!` });
    res.status(201).send(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
router.post('/signin', authMidWare, function (req, res) {
  //res.status(200).json({ message: `${req.user.username} was successfully logged in!` });
  res.status(200).json(req.user);
});

router.use('*', notFoundHandler);

module.exports = router;