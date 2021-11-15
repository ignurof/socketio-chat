<script>
    import * as animateScroll from "svelte-scrollto";
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");

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
        socket.on("serverMessage", (user, msg, rows) => {
            AddMessage(user, msg, rows);
            // Force update so reactivity works
            chatHistory = chatHistory;
            AutoScroll();
        });
    });

    const AddMessage = (user, msg, rows) => {
        let chatObj = {
            user,
            msg,
            rows
        };
        chatHistory.push(chatObj);
        // Clientside logging
        console.log("Client Message: " + msg);
    }

    let username = "Guest";
    let newMessage = "";

    const CalculateRows = (inputString) => {
        let maxrows=12; 
        let cols = 55;
        let arraytxt=inputString.split('\n');
        let rows=arraytxt.length; 
        for (let i=0;i<arraytxt.length;i++) 
        rows+=parseInt(arraytxt[i].length/cols);

        return new Promise((resolve, reject) => {
            if (rows>maxrows){
                rows=maxrows;
            } else{
                rows=rows;
            }
            resolve(rows);
        });
    }

   //socket.emit("clientMessage", newMessage);
    const SendMessage = async() => {
        // First calculate size of message
        let rows = await CalculateRows(newMessage);

        let msgObj = {
            username,
            newMessage,
            rows
        };

        if(newMessage.length > 300) return console.error("Message is too long!");

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
        // prevent default behavior like default new line
        if(event.keyCode == 13) event.preventDefault();

        // check if rowlimit
        let currentNumRows = (newMessage.match(/\n/g) || []).length + 1,
        maxNumRows = 12;
        if(event.keyCode == 13 && currentNumRows == maxNumRows){
            return false;
        }

        // 13 is the keycode for "enter"
        if (event.keyCode == 13 && event.shiftKey) {
            // Add line break
            newMessage += "\n";
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
        font-size: 4em;
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
        padding-bottom: 1em;
        /* Firefox */
        scrollbar-color: #dfdfdf #f8f8f8;
    }

    /* Chrome et al */
    .chat-view::-webkit-scrollbar{
        display:none;
    }

    .client-message{
        background: #e4f4f7;
        width: 80%;
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

    .client-message#incoming{
        background: #1E88E5;
        color: white;
        width: 80%;
        min-height: 10%;
        margin: 0 auto;
        margin-top: 1em;
        margin-left: 1.6em;
        border-top-right-radius: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: .4em;
        position: relative;
        left: 6em;
    }

    .client-message#incoming::before{
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
        font-size: 1.2em;
    }

    textarea{
        font-size: 1em;
        font-family: 'Rubik';
        resize: none;
        border: 0;
        background: inherit;
    }

    .client-message h4{
        margin: 0;
        margin-bottom: .2em;
        position: relative;
        top: -2em;
        left: .4em;
    }

    .client-message textarea{
        color: #000000;
        margin: 0;
        position: relative;
        top: -2.4em;
        left: .4em;
        border: 1px solid red;
        overflow: hidden;
    }

    .client-message#incoming textarea{
        color: #ffffff;
        margin: 0;
        position: relative;
        top: -1.8em;
        left: .4em;
    }

    .input-box{
        display: flex;
        flex-direction: row;
        background: #FCFCFC;
        border-radius: 8px;
        width: 100%;
        height: 6em;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.24);
        margin-bottom: 2em;
    }

    .input-box textarea{
        border: 2px solid #d7e3e4;
        border-radius: 8px;
        background: #EBF8FA;
        width: 90%;
        height: 70%;
        font-size: 1em;
        margin-top: .6em;
        margin-left: .6em;
    }

    .input-box textarea::-webkit-scrollbar{
        display: none;
    }

    .input-box svg{
        margin: 1em;
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
        {#if chatMessage.user === username}
            <div class="client-message" >
                <h4>{chatMessage.user}</h4>
                <textarea rows={chatMessage.rows} cols=50 readonly bind:value={chatMessage.msg} />
            </div>
        {:else}
            <div class="client-message" id="incoming">
                <h4>{chatMessage.user}</h4>
                <textarea rows={chatMessage.rows} cols=50 readonly bind:value={chatMessage.msg} />
            </div>
        {/if}
    {/each}
</div>

<div class="input-box">
    <textarea maxlength=300 id="inputbox" type="text" bind:value={newMessage} on:keypress={NewLine}/>
    <svg xmlns="http://www.w3.org/2000/svg" width="49.369" height="49.384" viewBox="0 0 49.369 49.384" on:click={() => SendMessage()}>
        <path id="Path_3" data-name="Path 3" d="M45.912.281,1.215,26.067a2.316,2.316,0,0,0,.212,4.166l10.251,4.3L39.383,10.117a.578.578,0,0,1,.829.8l-23.231,28.3v7.763a2.314,2.314,0,0,0,4.1,1.524L27.2,41.053l12.016,5.034A2.321,2.321,0,0,0,42.4,44.332L49.345,2.672A2.315,2.315,0,0,0,45.912.281Z" transform="translate(-0.01 0.031)" fill="#1e88e5"/>
    </svg>      
</div>
