// Dependency imports
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const md5 = require("blueimp-md5");

const authlist = require("./authlist.js");
const blockauthlist = require("./blockauthlist.js");

// Mongoose
// Create instance of account model
const Account = require("./models/account.js");

// Parse cookies so they can be interacted with
router.use(cookieParser());

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

    // Block user from login attempt if they have failed too many times
    // TODO: Maybe timeouts should set a cookie and that cookie changes the frontend so they cannot even try to login
    let blockedStatus = false;
    try{
        blockedStatus = await blockauthlist.IsUserBlocked(req.body.username);
    } catch(e){
        console.error(e);
    }

    // Check DB for already existing username
    let doesNotExist = false;
    let doc = await Account.findOne({ username: req.body.username });
    // Early return if user exists already in DB
    if(doc == null) doesNotExist = true;
    if(doesNotExist){
        blockauthlist.AddToBlock(req.body.username);
        if(blockedStatus) return res.send("Timeout!");
        return res.send("User does not exist!");
    }

    //console.log(doc);

    // Compare incoming md5 password against encrypted md5 db password
    let isPasswordCorrect = await bcrypt.compare(req.body.hashedPassword, doc.password);

    // Failed password check, this should add to timeout list, and after 5 failed attempts should be put into blocklist
    // Once in the blocklist, it should be removed from it only once a successfull login happens
    if(!isPasswordCorrect){
        blockauthlist.AddToBlock(req.body.username);
        if(blockedStatus) return res.send("Timeout!");
        return res.send("Failed attempt!");
    }

    // Remove block on successfull login
    blockauthlist.RemoveUserBlock(req.body.username);

    let authToken = GenerateTimestamp();
    let authID = doc.id; // ObjectID in MongoDB
    let authCookie = `${authToken}#${authID}`;
    // Registration successful
    res.cookie("auth", authCookie);
    authlist.AddAuthTokenToList(authToken, authID);
    res.send("OK");
});

module.exports = router;

// Returns true if invalid characters such as "'(){}[]\/;
const Sanitize = (input) => {
    // https://regex101.com/r/5xEdzq/1
    let regex = /[\"\'\\\/\(\)\{\}\[\]\;]/g;
    return regex.test(input);
}

const GenerateTimestamp = () => {
    let timestamp = Date.now(); // Time passed since 1970 Jan 1
    timestamp = md5(timestamp);
    return timestamp;
}

