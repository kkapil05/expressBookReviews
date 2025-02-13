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
  let isbn = req.params.isbn;
  let reviewData = req.query.review;
  let token = req.header('Authorization')?.split(' ')[1]; // Removes 'Bearer '

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    let decoded = jwt.verify(token, "kapilcalled"); // Decode JWT
    let username = decoded.username;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    let book = books[isbn];

    // If no reviews exist, initialize an empty object
    if (!book.reviews) {
      book.reviews = {};
    }

    // If the user already posted a review, update it
    if (book.reviews[username]) {
      book.reviews[username] = reviewData;
      return res.status(200).json({ message: "Review updated successfully", reviews: book.reviews });
    }

    // Otherwise, add a new review
    book.reviews[username] = reviewData;
    return res.status(201).json({ message: "Review added successfully", reviews: book.reviews });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let reviewData = req.query.review;
  let token = req.header('Authorization')?.split(' ')[1]; // Removes 'Bearer '

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    let decoded = jwt.verify(token, "kapilcalled"); // Decode JWT
    let username = decoded.username;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    let book = books[isbn];

    // // If no reviews exist, initialize an empty object
    // if (!book.reviews) {
    //   return res.status(404).json({ message: "No review to delete." });
    // }

    // If the user already posted a review, delete it
    if (book.reviews[username]) {
       delete book.reviews[username]; 
      return res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });
      }

    // // Otherwise, add a new review
    // book.reviews[username] = reviewData;
    return res.status(404).json({ message: "No review to delete"});

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
