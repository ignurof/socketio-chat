// Required dependency
const express = require("express");
const cors = require("cors");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config.js");
const mongoose = require('mongoose');

// Application
let app = express();
const PORT = 3002;

// Router
const chat = require("./chat.js");
const register = require("./register.js");
const login = require("./login.js");

// CORS SETUP
let corsOptions = {
    "origin": 'chat.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
}

// Preflight request using corsOptions object, for all routes
app.use(cors(corsOptions))

// View Engine declarations
let engine = svelteViewEngine(config.svelteViewEngine);
let { dir, type, buildDir } = config.svelteViewEngine;

// View Engine setup
app.engine(type, engine.render);
app.set("view engine", type);
app.set("views", dir);
// Change this to fit your static content (Images, etc.)
app.use("/assets", express.static(buildDir));

// Auto-parse JSON for res.json
app.use(express.json());

// Render the response with props before responding
app.get("/", (req, res, next) => {
    res.render("index");
});

// Chat endpoint router
app.use("/chat", chat);

app.use("/register", register)

app.use("/login", login);

// Socket IO
const socketio = require("socket.io");
// Hook up the app.listen to a const so I can hook into it with socket listen aka io
const server = app.listen(PORT, async() => {
    console.log("Server listening on port: " + PORT);

    // Open connection
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
});
const io = socketio(server);

// Keep the io instance aka send it to routes
app.set('socketio', io);

// This is what happens when a client connects to ws server
io.on("connection", (socket) => {
    // Send from server to client, use key on both ends to access
    //socket.emit("world", "World");

    //socket.on("clientMessage", (clientMsg) => {
    //    console.log("CLIENT: " + clientMsg);
    //})
});

