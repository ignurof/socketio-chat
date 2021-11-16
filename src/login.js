// Dependency imports
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

// Mongoose
// Create instance of account model
const Account = require("./models/account.js");

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('LOGIN ROUTE @ Time: ', Date.now());
    next();
});

// Redirect to index
router.get('/', (req, res) => {
    res.redirect("/");
});

// Login with user account
router.post("/", async(req, res) => {
    // Verify user input and sanitize again
    if(Sanitize(req.body.username)) return res.send("Username is invalid!");
    if(Sanitize(req.body.hashedPassword)) return res.send("Password is invalid!");

    // Check DB for already existing username
    let doesNotExist = false;
    let doc = await Account.findOne({ username: req.body.username });
    // Early return if user exists already in DB
    if(doc == null) doesNotExist = true;
    if(doesNotExist) return res.send("User does not exist!");

    //console.log(doc);

    // Compare incoming md5 password against encrypted md5 db password
    let isPasswordCorrect = await bcrypt.compare(req.body.hashedPassword, doc.password);

    // Failed password check, this should add to timeout list, and after 5 failed attempts should be put into blocklist
    // Once in the blocklist, it should be removed from it only once a successfull login happens
    if(!isPasswordCorrect) return res.send("Failed attempt!");

    // Registration successful
    res.send("OK");
});

module.exports = router;

// Returns true if invalid characters such as "'(){}[]\/;
const Sanitize = (input) => {
    // https://regex101.com/r/5xEdzq/1
    let regex = /[\"\'\\\/\(\)\{\}\[\]\;]/g;
    return regex.test(input);
}