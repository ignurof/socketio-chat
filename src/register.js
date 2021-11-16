// Dependency imports
const express = require("express");
const router = express.Router();
const md5 = require("blueimp-md5");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Mongoose
const Account = require("./models/account.js");

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
router.post("/", async(req, res) => {
    // Verify user input and sanitize again
    if(!VerifyEmail(req.body.email) || Sanitize(req.body.email)) return res.send("Email is invalid!");
    if(Sanitize(req.body.username)) return res.send("Username is invalid!");
    if(Sanitize(req.body.hashedPassword)) return res.send("Password is invalid!");

    // Check DB for already existing username
    let alreadyExists = false;
    let doc = await Account.findOne({ username: req.body.username });
    // Early return if user exists already in DB
    if(doc != null) alreadyExists = true;
    if(alreadyExists) return res.send("Username is already taken!");

    // Encrypt md5 hashed password with Bcrypt
    bcrypt.hash(req.body.hashedPassword, 10, async(err, hash) => {
        if(err) return console.error(err);

        // Create account if not found
        console.log("User Account Created: " + req.body.username);
        // Use Model to create Document
        const newUser = new Account({ username: req.body.username, email: req.body.email, password: hash });
        await newUser.save();
    });

    // Registration successful
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