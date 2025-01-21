const users = require("../router/auth_users").users;

const registerUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const present = users.filter((user) => user.username === username)
        if (present.length === 0) {
            users.push({ "username": req.body.username, "password": req.body.password });
            return res.status(201).json({ message: "User created Successfully!" })
        }
        else {
            return res.status(400).json({ message: "User already exists" })
        }
    }
    else if (!username && !password) {
        return res.status(400).json({ message: "Bad request" })
    }
    else if (!username || !password) {
        return res.status(400).json({ message: "Check username and password" })
    }

}

module.exports = { registerUser };