const books = require('../router/booksdb.js')

/*
 * Controller Folder handling routes and functions (logics??) such as fetching values.  
 */

const dataFetch = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000)
    })
}

function getAllBooks(req, res) {
    try {
        dataFetch(books).then((data) => {
            return res.send(data);
        }).catch((error) => {
            return res.status(500).json({ message: "An error occured!" });
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred!" });
    }
}

function getBookByISBN(req, res) {
    try {
        const isbn = req.params.isbn;
        dataFetch(books[isbn]).then((data) => {
            if (data) {
                return res.send(data)
            }
            return res.status(404).json({ message: `Book with ISBN ${isbn} not found!` });
        }).catch((err) => {
            return res.status(404).json({ message: `An error occured! ${err}` });

        })

    } catch (error) {
        res.status(500).json({ message: `An error occured! : ${error}` })
    }
}

function getBookByAuthor(req, res) {
    try {
        const author = req.params.author;
        const bookValues = Object.values(books);
        const filteredBooks = bookValues.filter(book => book.author === author);

        dataFetch(filteredBooks).then((data) => {
            if (data.length > 0) {
                return res.send(data);
            } else {
                return res.status(404).json({ message: `Book with author named ${author} not found` });
            }
        }).catch((err) => {
            return res.status(404).json({ message: `An error occured! : ${err}` })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred!" });
    }
}


function getBookByTitle(req, res) {
    try {
        const title = req.params.title;
        const bookValue = Object.values(books);
        const filteredBooks = bookValue.filter((book) => book.title === title);
        dataFetch(filteredBooks).then((data) => {
            if (data.length > 0) {
                return res.send(data)
            }
            return res.status(500).json({ message: `Book with title named ${title} not found` })
        }).catch((err) => {
            return res.status(404).json({ message: `An error occured! : ${err}` })
        })

    } catch (error) {
        res.status(500).json({ message: "An error occured!" })
    }
}

function getBookReview(req, res) {
    try {
        const isbn = req.params.isbn;
        dataFetch(books[isbn].reviews).then((data) => {
            return res.send(data);
        }).catch((err) => {
            return res.status(404).json({ message: `An error occured! : ${err}` })
        })
    } catch (error) {
        res.status(500).json({ message: `An error occured! ${error}` })
    }
}




module.exports = { getAllBooks, getBookByISBN, getBookByAuthor, getBookByTitle, getBookReview, dataFetch }; 