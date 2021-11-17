// Dependency imports
const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');

// Parse cookies so they can be interacted with
router.use(cookieParser());

let io;

const authlist = require("./authlist.js");
const chathistory = require("./chathistory.js");

// middleware that is specific to this router
router.use((req, res, next) => {
    // Verify authentication of client
    VerifyAuth(req.cookies.auth);

    // Grab the reference so we can use it
    io = req.app.get('socketio');
    console.log('CHAT ROUTE @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', (req, res) => {
    res.render("chat", {
       chatHistory: chathistory.GetChatHistory(), 
    });
});

router.post("/message", (req, res) => {
    chathistory.AddMessage(req.body.username, req.body.newMessage, req.body.rows);

    io.emit("serverMessage", req.body.username, req.body.newMessage, req.body.rows);

    res.send("Message sent!");
});

module.exports = router;

const VerifyAuth = (authCookie) => {
    let auth = authCookie.split('#');
    let authObj = {
        "token": auth[0],
        "id": auth[1]
    };

    let userIsAuth = authlist.VerifyUserAuth(authObj.token);
    if(!userIsAuth) return res.redirect('/');
}