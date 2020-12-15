'use strict';

// 3rd Party Resources
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const Users = mongoose.model('users', usersSchema);

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', async (req, res) => {

  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await Users.findOne({ username: username });
    if (user) { // If a user was found...
      const valid = await bcrypt.compare(password, user.password);
      if (valid) { // If the password matches...
        res.status(200).json(`${user.username} is now authenticated.`); // Send back the username
      } else { // Password didn't match...
        throw new Error('Invalid Password');
      }
    } else { // If the user was not found...
      throw new Error('Invalid User');
    }
  } catch (error) {
    // Send back a generic error message of 'Invalid Login'
    res.status(403).send('Invalid Login');
  }

});

module.exports = router;