// Required dependency
const express = require("express");
const cors = require("cors");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config.js");

// Application
let app = express();
const PORT = 3002;

// CORS SETUP
let corsOptions = {
    "origin": 'chat.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
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
    res.render("index", {
        // Props here
    });
});

app.get("/test", (req, res, next) => {
    io.emit("world", "Emit from test route fetch call");
});

// Socket IO
const socketio = require("socket.io");
// Hook up the app.listen to a const so I can hook into it with socket listen aka io
const server = app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});
const io = socketio(server);

// This is what happens when a client connects to ws server
io.on("connection", (socket) => {
    // FIXME: I can use emit anywhere, but not certain I can recieve everywhere
    // handle the event sent with socket.emit() from client
    //socket.on("clientConnect", (elem1) => {
    //    console.log(elem1);
    //});

    // Send from server to client, use key on both ends to access
    //socket.emit("world", "World");

    socket.on("clientMessage", (clientMsg) => {
        console.log("CLIENT: " + clientMsg);
    })
});