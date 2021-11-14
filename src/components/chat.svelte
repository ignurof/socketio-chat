<script>
    import * as animateScroll from "svelte-scrollto";
    import { io } from "socket.io-client";
    const socket = io("localhost:3002");

    animateScroll.setGlobalOptions({
        container: "#chat-box",
        offset: "200"
    });

    export let chatHistory = [];

    // Client socket callback that occurs on connection to server. 
    socket.on("connect", () => {
        // either with send()  socket.send("Hello!");
        // or with emit() and custom event names 
        //let clientConnected = `CLIENT connected from ...`;
        //socket.emit("clientConnect", clientConnected);
        console.log("Connected to server");

        // Client socket listening to specific key emit from server socket
        socket.on("serverMessage", (user, msg) => {
            AddMessage(user, msg);
            // Force update so reactivity works
            chatHistory = chatHistory;
            AutoScroll();
        });
    });

    const AddMessage = (user, msg) => {
        let chatObj = {
            user,
            msg
        };
        chatHistory.push(chatObj);
        // Clientside logging
        console.log("Client Message: " + msg);
    }

    let username = "Guest";
    let newMessage = "";

   //socket.emit("clientMessage", newMessage);
    const SendMessage = async() => {
        let msgObj = {
            username,
            newMessage
        };

        if(newMessage.length > 240) return console.error("Message is too long!");

        let response = await fetch("/chat/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(msgObj)
        });

        if(!response.ok) return console.error("Could not send message!");

        let result = response.text();
        //console.log(result);
        // Reset inputfield value
        newMessage = "";
    }

    // Handles key events on inputbox, like pressing enter to send message
    const NewLine = (event) => {
        // 13 is the keycode for "enter"
        if (event.keyCode == 13 && event.shiftKey) {
            // Add line break
            //newMessage += "\n";
        }
        if (event.keyCode == 13 && !event.shiftKey) {
            // Send message
            SendMessage();
        }
    }

    const AutoScroll = () => {
        animateScroll.scrollToBottom();
    }

    // Reactively update the client-message fields
    $: chatHistory;
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
        width: 80%;
        min-height: 14%;
        max-height: 14%;
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
        left: 42em;
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

    textarea{
        font-size: 1.2em;
        font-family: 'Rubik';
        resize: none;
        border: 0;
        background: inherit;
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
        left: 28.2em;
    }

    .client-message textarea{
        margin: 0;
        position: relative;
        top: -1.8em;
        left: .4em;
        width: 80%;
        max-height: 80%;
        overflow: hidden;
    }

    .client-message:nth-child(even) textarea{
        position: relative;
        left: 7em;
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

    .message-box textarea{
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
        
    }
</style>

<h1>CHAT</h1>

<div class="chat-view" id="chat-box">
    {#each chatHistory as chatMessage, i}
        <div class="client-message">
            <h4>{chatMessage.user}</h4>
            <textarea rows=6 readonly wrap="soft">{chatMessage.msg}</textarea>
        </div>
    {/each}
</div>

<div class="message-box">
    <textarea maxlength=240 id="inputbox" type="text" bind:value={newMessage} on:keypress={NewLine} wrap="soft"/>
    <svg xmlns="http://www.w3.org/2000/svg" width="49.369" height="49.384" viewBox="0 0 49.369 49.384" on:click={() => SendMessage()}>
        <path id="Path_3" data-name="Path 3" d="M45.912.281,1.215,26.067a2.316,2.316,0,0,0,.212,4.166l10.251,4.3L39.383,10.117a.578.578,0,0,1,.829.8l-23.231,28.3v7.763a2.314,2.314,0,0,0,4.1,1.524L27.2,41.053l12.016,5.034A2.321,2.321,0,0,0,42.4,44.332L49.345,2.672A2.315,2.315,0,0,0,45.912.281Z" transform="translate(-0.01 0.031)" fill="#1e88e5"/>
    </svg>      
</div>
