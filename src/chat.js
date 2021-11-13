// Dependency imports
const express = require("express");
const router = express.Router();

let io;

const chathistory = require("./chathistory.js");

// middleware that is specific to this router
router.use((req, res, next) => {
    // Grab the reference so we can use it
    io = req.app.get('socketio');
    console.log('CHAT ROUTE @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', (req, res) => {
    res.render("index", {
       chatHistory: chathistory.GetChatHistory(), 
    });
});

router.post("/message", (req, res) => {
    chathistory.AddMessage(req.body.username, req.body.newMessage);

    io.emit("serverMessage", req.body.username, req.body.newMessage);

    res.send("Message sent!");
});

module.exports = router;