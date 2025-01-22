const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.authorization) {
        token = req.session.authorization['accessToken'];
        jwt.verify(token, 'access', (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({ message: 'User not Authenticated!' })
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in!" })
    }
});

const PORT = 5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log('Server is running on http://localhost:5001'));


// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const { authenticated } = require('./regd_users'); // Importing the user routes

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Use the routes for user authentication and reviews
// app.use('/auth', authenticated);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });///
