<script>
    import md5 from "blueimp-md5/js/md5.js"; // Need to delcare this npm module like this on client

    let isErrorShowing = false;
    let popupErrorMessage = "default error";
    const ToggleErrorPopup = () => {
        isErrorShowing = !isErrorShowing;
    }

    let username = "";
    let password = "";

    // Returns true if invalid characters such as "'(){}[]\/;
    const Sanitize = (input) => {
        // https://regex101.com/r/5xEdzq/1
        let regex = /[\"\'\\\/\(\)\{\}\[\]\;]/g;
        return regex.test(input);
    }

    // Await the promise before continue in flow
    const GenerateHash = (input) => {
        return new Promise((resolve, reject) => {
            let output = md5(input);
            resolve(output);
        });
    }

    // Attempt login
    const Login = async() => {
        let canSend = true;
        // Verify user input and sanitize
        if(Sanitize(username)){
            popupErrorMessage = "Username is invalid!";
            canSend = false;
        } 
        if(Sanitize(password)){
            popupErrorMessage = "Password is invalid!";
            canSend = false;
        }
        // If frontend determines we cant send data, return out and call the method
        if(!canSend) return ToggleErrorPopup();

        let hashedPassword = await GenerateHash(password);

        // Create User Account object
        let userDetails = {
            username,
            hashedPassword
        };

        // Attempt fetch call
        let response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(userDetails)
        });

        if(!response.ok) return console.error("Fetch call failed!");

        popupErrorMessage = await response.text();
        if(popupErrorMessage === "OK") location.href = "/chat";
        // Catch possible errors and show error modal popup if register did not complete
        ToggleErrorPopup();
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    .login{
        background: #FCFCFC;
        border-radius: 8px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.24);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1em;
    }

    legend{
        font-size: 1.2em;
        font-family: 'Rubik';
        font-weight: bold;
        margin: 0;
        margin-top: 2em;
        margin-bottom: .4em;
        width: 70%;
    }

    input{
        border: 0;
        border-radius: 8px;
        background: #e4f4f7;
        width: 70%;
        height: 8%;
        margin: 0;
        font-size: 1.2em;
        padding: .6em;
        margin-bottom: 1em;
    }

    button{
        border: 0;
        padding: 0;
        padding-left: .8em;
        padding-right: .8em;
        padding-top: .4em;
        padding-bottom: .4em;
        font-size: 2em;
        margin: 0;
        margin-top: 1em;
        margin-bottom: 1em;
        width: 60%;
        color: white;
        border-radius: 64px;
        background-image: linear-gradient(to right, #47cff8, #4de0b4);
        box-shadow: 0px 6px 6px #bf78fe41;
        cursor: pointer;
    }

    button:hover{
        background-image: linear-gradient(to right, #6bd7f8, #62e2bc);
    }

    .error{
        z-index: 2;
        background: rgba(0, 0, 0, 0.42);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display:flex;
        flex-direction: column;
        justify-content: center; /* Vertical */
        align-items: center; /* Hortizontal */
    }

    .error svg{
        width: 10%;
        margin-left: auto;
        margin-bottom: auto;
        cursor: pointer;
        fill: red;
        stroke: white;
    }

    .error svg:hover{
        fill: rgb(222, 0, 0);
        stroke: rgb(222, 222, 222);
    }

    .error p{
        padding: 0;
        margin: 0;
        position: relative;
        bottom: 40%;
        font-size: 1.2em;
    }

    .error-modal{
        background: #FCFCFC;
        border-radius: 8px;
        width: 90%;
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Vertical */
        align-items: center; /* Hortizontal */
        margin-bottom: 10%;
    }

    /* RESPONSIVENESS , top of order is more important, so weird ones like the iPhone X goes here */
    /* Galaxy S5 */
    @media screen and (min-width: 360px) and (max-width: 640px){
        button{
            margin-top: 0;
            margin-bottom: 0;
        }
    }
    /* iPhone X */
    @media screen and (min-width: 375px) and (max-width: 812px){
        button{
            margin-top: 1em;
            margin-bottom: 1em;
        }
    } 
    /* Pixel 2 */
    @media screen and (min-width: 411px) and (max-width: 731px){
        /* I dont need to specify here if I already have in iPhone X, but if I want more specific I can */
    }

    /* iPad */
    @media screen and (min-width: 768px) {
        .error-modal{
            width: 60%;
        }
    }


    /* iPad Pro */
    @media screen and (min-width: 1024px){
        .error-modal{
            width: 50%;
        }
    }

    /* Generic Laptop */
    @media screen and (min-width: 1280px){
        .error-modal{
            width: 40%;
        }
    }

    /* Desktop */
    @media screen and (min-width: 1920px){
        .error-modal{
            width: 30%;
        }
    }
</style>

<div class="login">
    <legend>USERNAME</legend>
    <input type="text" bind:value={username}/>

    <legend>PASSWORD</legend>
    <input type="text" bind:value={password}/>

    <button on:click={() => Login()}>ENTER</button>
</div>

{#if isErrorShowing}
    <div class="error">
        <div class="error-modal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" on:click={() => ToggleErrorPopup()}>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{popupErrorMessage}</p>
        </div>
    </div>
{/if}