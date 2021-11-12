<script>
    import { io } from "socket.io-client";
    const socket = io("localhost:3002");

    // Client socket callback that occurs on connection to server. 
    socket.on("connect", () => {
        // either with send()  socket.send("Hello!");
        // or with emit() and custom event names 
        //let clientConnected = `CLIENT connected from ...`;
        //socket.emit("clientConnect", clientConnected);
        
        // Client socket listening to specific key emit from server socket
        //socket.on("world", (elem1) => {
        //    console.log(elem1);
        //});

    });

    let username = "Guest";
    let newMessage = "";
    let chatHistory = [];

    const TestData = async() => {
        let response = await fetch("/test");
        if(!response.ok) return console.error("ERROR FETCH");
    }

    const SendMessage = () => {
        socket.emit("clientMessage", newMessage);
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    h1{
        margin: 0 auto;
        margin-top: 1em;
        font-size: 64px;
        color: #FFFFFF;
    }

    .chat-view{
        background: #FCFCFC;
        border-radius: 8px;
        width: 100%;
        height: 80%;
        margin-bottom: 2em;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.24);
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-color: #dfdfdf #f8f8f8;
    }

    .client-message{
        background: #e4f4f7;
        width: 90%;
        min-height: 10%;
        margin: 0 auto;
        margin-top: 1em;
        margin-left: 1.6em;
        border-top-right-radius: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: .4em;
    }

    .client-message::before{
        content: '';
        top: -.4em;
        left: -1.4em;
        position: relative;
        display: block;
        width: 2em;
        height: 1em;
        background-color: transparent;
        border-top: 20px solid #e4f4f7;
        border-left: 20px solid transparent;
    }

    .client-message:nth-child(even){
        background: #1E88E5;
        border-top-right-radius: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        margin: 0 auto;
        margin-top: 1em;
        margin-right: 1.6em;
    }

    .client-message:nth-child(even)::before{
        content: '';
        top: -.4em;
        left: 47.6em;
        position: relative;
        display: block;
        width: 2em;
        height: 1em;
        background-color: transparent;
        border-top: 20px solid #1E88E5;
        border-left: 20px solid transparent;
        transform: rotateY(180deg);
    }

    h4{
        font-size: 1.4em;
    }

    p{
        font-size: 1.2em;
    }

    .client-message h4{
        margin: 0;
        margin-bottom: .2em;
        position: relative;
        top: -1.6em;
        left: .4em;
    }

    .client-message:nth-child(even) h4{
        position: relative;
        left: 30em;
    }

    .client-message p{
        margin: 0;
        position: relative;
        top: -2em;
        padding-right: 6em;
        padding-left: .5em;
    }

    .client-message:nth-child(even) p{
        position: relative;
        padding-left: 6em;
        padding-right: .5em;
    }

    .message-box{
        display: flex;
        flex-direction: row;
        background: #FCFCFC;
        border-radius: 8px;
        width: 100%;
        height: 6em;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.24);
    }

    .message-box fieldset{
        border: 2px solid #d7e3e4;
        border-radius: 8px;
        background: #EBF8FA;
        width: 90%;
        height: 70%;
        margin: .3em;
        font-size: 1.4em;
        padding: .3em;
    }

    .message-box svg{
        margin-left: 1em;
        margin-right: 1.4em;
        margin-top: 1.4em;
        cursor: pointer;
    }

    /* RESPONSIVENESS */
    /* Desktop */
    @media screen and (min-width: 1026px) {
        .chat-view{
            height: 58%;
        }

        .client-message{
            width: 80%;
        }

        .client-message:nth-child(even)::before{
            content: '';
            top: -.4em;
            left: 55em;
            position: relative;
            display: block;
            width: 2em;
            height: 1em;
            background-color: transparent;
            border-top: 20px solid #1E88E5;
            border-left: 20px solid transparent;
            transform: rotateY(180deg);
        }

        .client-message:nth-child(even) h4{
            position: relative;
            left: 35em;
        }
    }
</style>

<h1>CHAT</h1>

<div class="chat-view">
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
    <div class="client-message">
        <h4>Username</h4>
        <p>Message here</p>
    </div>
</div>

<div class="message-box">
    <fieldset contenteditable="true" bind:textContent={newMessage} />
    <svg xmlns="http://www.w3.org/2000/svg" width="49.369" height="49.384" viewBox="0 0 49.369 49.384">
        <path id="Path_3" data-name="Path 3" d="M45.912.281,1.215,26.067a2.316,2.316,0,0,0,.212,4.166l10.251,4.3L39.383,10.117a.578.578,0,0,1,.829.8l-23.231,28.3v7.763a2.314,2.314,0,0,0,4.1,1.524L27.2,41.053l12.016,5.034A2.321,2.321,0,0,0,42.4,44.332L49.345,2.672A2.315,2.315,0,0,0,45.912.281Z" transform="translate(-0.01 0.031)" fill="#1e88e5"/>
    </svg>      
</div>
