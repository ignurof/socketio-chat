<script>
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");

    // Client socket callback that occurs on connection to server. 
    socket.on("connect", () => {
        // either with send()  socket.send("Hello!");
        // or with emit() and custom event names 
        socket.emit("hello", "Hello");
        
        // Client socket listening to specific key emit from server socket
        socket.on("world", (elem1) => {
            console.log(elem1);
        });
    });

    let username = "Guest";
    let newMessage = "";
    let chatHistory = [];
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    h1{
        font-size: 64px;
    }
</style>

<h1>CHAT</h1>