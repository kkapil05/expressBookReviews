const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  if(!username || !password)
  {
    return res.status(300).json({message: 'username or password missing'})
  }
  let user = users.find(user=> user.username === username && user.password === password);
  if(!user)
  return res.status(404).json({message: "user not found"});
  // Generate JWT token
  let accessToken = jwt.sign({ username: user.username }, 'kapilcalled', { expiresIn: '1h' });
   return res.status(200).json({ message: "Login successful", token: accessToken });
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
