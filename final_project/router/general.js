const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  if(username && password)
  {
        if(users.find(user => user.username === username))
        {
            return res.send("user already exist");
        }
        users.push({ username, password });
        return res.status(201).json({ message: "User registered successfully" });
  }
  else 
  return res.status(301).json({message: "username or password missing"})
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn])
  {
    res.json(books[isbn]);
  }
  else
  return res.status(404).json({ message: "Book not found" });
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 //Write your code here
 let authorName = req.params.author.toLowerCase();
 let filteredBooks = [];
  // Loop through object values (books)
  for (let key in books) {
    if (books[key].author.toLowerCase() === authorName) {
        filteredBooks.push({ isbn: key, ...books[key] }); // Include ISBN in the response
    }
}
 if(filteredBooks.length >0)
 {
   res.json(filteredBooks);
 }
 else
 return res.status(404).json({ message: "Book not found" });

//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //Write your code here
 let titleName = req.params.title.toLowerCase();
 let filteredBooks = [];
  // Loop through object values (books)
  for (let key in books) {
    if (books[key].title.toLowerCase() === titleName) {
        filteredBooks.push({ isbn: key, ...books[key] }); // Include ISBN in the response
    }
}
 if(filteredBooks.length >0)
 {
   res.json(filteredBooks);
 }
 else
 return res.status(404).json({ message: "Book not found" });

//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn])
  {
    res.json(books[isbn].reviews);
  }
  else
  return res.status(404).json({ message: "Book not found" });

//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
