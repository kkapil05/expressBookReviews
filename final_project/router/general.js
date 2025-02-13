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
const axios = require('axios');
public_users.get('/', function (req, res) {
    res.json(books);
});

public_users.get('/external-books', async function (req, res) {
    try {
        const response = await axios.get('https://kapil65kumar-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/'); // Replace with actual API URL
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book data", error: error.message });
    }
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

 public_users.get('/await/isbn/:isbn', async function (req, res) {
    let isbn = req.params.isbn;
    try {
        const response = await axios.get(`https://kapil65kumar-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/${isbn}`); // Replace with actual API URL
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book data", error: error.message });
    }
});
// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//  //Write your code here
//  let authorName = req.params.author.toLowerCase();
//  let filteredBooks = [];
//   // Loop through object values (books)
//   for (let key in books) {
//     if (books[key].author.toLowerCase() === authorName) {
//         filteredBooks.push({ isbn: key, ...books[key] }); // Include ISBN in the response
//     }
// }
//  if(filteredBooks.length >0)
//  {
//    res.json(filteredBooks);
//  }
//  else
//  return res.status(404).json({ message: "Book not found" });

// //   return res.status(300).json({message: "Yet to be implemented"});
// });

// Using Async-Await
public_users.get('/author/:author', async function (req, res) {
    let authorName = req.params.author.toLowerCase();
    try {
        const response = await axios.get(`https://kapil65kumar-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/`); // Replace with actual API URL
        let booksData = response.data;

        let filteredBooks = Object.entries(booksData)
            .filter(([isbn, book]) => book.author.toLowerCase() === authorName)
            .map(([isbn, book]) => ({ isbn, ...book }));

        if (filteredBooks.length > 0) {
            return res.json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   //Write your code here
//  let titleName = req.params.title.toLowerCase();
//  let filteredBooks = [];
//   // Loop through object values (books)
//   for (let key in books) {
//     if (books[key].title.toLowerCase() === titleName) {
//         filteredBooks.push({ isbn: key, ...books[key] }); // Include ISBN in the response
//     }
// }
//  if(filteredBooks.length >0)
//  {
//    res.json(filteredBooks);
//  }
//  else
//  return res.status(404).json({ message: "Book not found" });

// //   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/title/:title', async function (req, res) {
    let titleName = req.params.title.toLowerCase();
    try {
        const response = await axios.get(`https://kapil65kumar-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/`); // Replace with actual API URL
        let booksData = response.data;

        let filteredBooks = Object.entries(booksData)
            .filter(([isbn, book]) => book.title.toLowerCase() === titleName)
            .map(([isbn, book]) => ({ isbn, ...book }));

        if (filteredBooks.length > 0) {
            return res.json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
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
