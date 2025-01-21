const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
  "username": "user",
  "password": "password"
}
];

const isValid = (username) => {
  const usernameMatches = users.filter((user) => user.username === username);
  return usernameMatches.length > 0;
}

const authenticatedUser = (username, password) => {
  const isUserMatched = users.filter(user => user.username === username && user.password === password);
  return isUserMatched;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = authenticatedUser(username, password);
  if (user.length > 0) {
    const accessToken = jwt.sign({ username: user[0].username }, 'access', { expiresIn: '1h' });
    req.session.authorization = { accessToken, username };
    return res.status(200).json({ message: "User successfully logged in", accessToken });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Extract the values from the parameter, body, and session authorization object.
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  let book = books[isbn];
  if (book) {
    book.reviews[username] = review;
    return res.status(200).json({ message: "Review successfully posted!" });
  }
  return res.status(404).json({ message: `Book with ISBN ${isbn} not found!` })
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  let book = books[isbn];
  if (book) {
    delete book.reviews[username];
    return res.status(200).json({ message: "Review successfully deleted!" })
  }
  return res.status(404).json({ message: `Book with ISBN ${isbn} not found!` })

})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
