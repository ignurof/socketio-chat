// Dependency imports
const express = require("express");
const router = express.Router();
const md5 = require("blueimp-md5");

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('REGISTER ROUTE @ Time: ', Date.now());
    next();
});

// Redirect to index
router.get('/', (req, res) => {
    res.redirect("/");
});

// Register new user account
router.post("/", (req, res) => {
    // Verify user input and sanitize again
    if(!VerifyEmail(req.body.email) || Sanitize(req.body.email)) return res.send("Email is invalid!");
    if(Sanitize(req.body.username)) return res.send("Username is invalid!");
    if(Sanitize(req.body.password)) return res.send("Password is invalid!");

    res.send("OK");
});

module.exports = router;

// https://regexr.com/
const VerifyEmail = (input) => {
    let regex = /@*.\./i;
    // Returns true if email
    return regex.test(input);
}

// Returns true if invalid characters such as "'(){}[]\/;
const Sanitize = (input) => {
    // https://regex101.com/r/5xEdzq/1
    let regex = /[\"\'\\\/\(\)\{\}\[\]\;]/g;
    return regex.test(input);
}

// Await the promise before continue in flow
const GenerateHash = (input) => {
    return new Promise((resolve, reject) => {
        let output = md5(input);
        resolve(output);
    });
}