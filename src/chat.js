// Dependency imports
const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');

// Parse cookies so they can be interacted with
router.use(cookieParser());

let io;

const authlist = require("./authlist.js");
const chathistory = require("./chathistory.js");
const user = require("./user.js");

// middleware that is specific to this router
router.use((req, res, next) => {
    // catch missing auth error
    if(req.cookies.auth == undefined) return res.redirect('/');
    let authObj = ParseAuthCookie(req.cookies.auth);
    // Verify authentication of client
    VerifyAuth(res, authObj.token);

    // Grab the reference so we can use it
    io = req.app.get('socketio');
    console.log('CHAT ROUTE @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', async(req, res) => {
    // Grab the cookie so it can be used
    let authObj = ParseAuthCookie(req.cookies.auth);
    let userAccount;
    // This userAccount holds sensitive data, and should on exist on server ever
    try{
        userAccount = await user.FindUserByID(authObj.id);
    } catch(e){
        return console.error(e);
    }
    
    //console.log(userAccount);
    
    res.render("chat", {
       chatHistory: chathistory.GetChatHistory(), 
       username: userAccount.username, // Find user and use
    });
});

router.post("/message", (req, res) => {
    chathistory.AddMessage(req.body.username, req.body.newMessage, req.body.rows);

    io.emit("serverMessage", req.body.username, req.body.newMessage, req.body.rows);

    res.send("Message sent!");
});

module.exports = router;

const VerifyAuth = (res, token) => {
    let userIsAuth = authlist.VerifyUserAuth(token);
    if(!userIsAuth) return res.redirect('/');
}

const ParseAuthCookie = (authCookie) => {
    let auth = authCookie.split('#');
    let authObj = {
        "token": auth[0],
        "id": auth[1]
    };
    return authObj;
}