// Required dependency
const express = require("express");
const cors = require("cors");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config.js");
const mongoose = require('mongoose');

const DBTest = async() => {
    // Open connection
    await mongoose.connect('mongodb://localhost:27017/chat');
    // Declare a Schema
    const accountSchema = new mongoose.Schema({
        username: String
    });
    // Compile Schema to Model (Mongoose auto adds "s" to the end of the Model name in MongoDB)
    const UserAccount = mongoose.model("Account", accountSchema);
    // Use Model to create Document
    const testUser = new UserAccount({ username: "Test Dude" });
    console.log(testUser);
    // Save Document to DB in open connection
    await testUser.save();
}

// Call the method and then catch errors
DBTest().catch(err => console.log(err));

// Application
let app = express();
const PORT = 3002;

// Router
const chat = require("./chat.js");

// CORS SETUP
let corsOptions = {
    "origin": 'chat.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowedHeaders": ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
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
    res.redirect("/chat");
});

// Chat endpoint router
app.use("/chat", chat);

// Socket IO
const socketio = require("socket.io");
// Hook up the app.listen to a const so I can hook into it with socket listen aka io
const server = app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
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

