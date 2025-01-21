const bookController = require('../controllers/books');
const userController = require('../controllers/user');

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const public_users = express.Router();


// Get the book list available in the shop
public_users.get('/', bookController.getAllBooks);

// Get book details based on ISBN
public_users.get('/isbn/:isbn', bookController.getBookByISBN);

// Get book details based on author
public_users.get('/author/:author', bookController.getBookByAuthor);

// Get all books based on title
public_users.get('/title/:title', bookController.getBookByTitle);

//  Get book review
public_users.get('/review/:isbn', bookController.getBookReview);

//FIXME: Resister User 
public_users.post("/register", userController.registerUser);

module.exports.general = public_users;
