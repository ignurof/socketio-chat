<script>
    import Chat from "../components/chat.svelte"; // <Chat {chatHistory}/>
    //export let chatHistory = [];
    import Register from "../components/register.svelte"; // <Register />
    import Login from "../components/login.svelte"; // <Login />

    let activePage = "login";
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    main{
        margin: 0 auto;
        height: 90vh;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-family: 'Rubik';
    }

    h1{
        margin: 0 auto;
        margin-top: 1em;
        font-size: 4em;
        color: #FFFFFF;
    }

    footer{
        background: #00897B;
        height: 10vh;
        color: #EFEFEF;
        text-align: center;
        font-size: 1em;
    }

    footer p{
        padding: 0;
        margin: 0;
    }

    footer a{
        text-decoration: none;
        color: #EFEFEF;
    }

    /* RESPONSIVENESS */
    /* Mobile */
    /* Galaxy S5 */
    @media screen and (min-width: 360px) and (max-width: 640px){
        h1{
            margin-top: 0;
        }
    }

    @media screen and (min-width: 320px){
        main{
            width: 96%;
        }

        footer p{
            padding-top: 1.6em;
        }
    }

    /* iPad */
    @media screen and (min-width: 768px) {
        main {
            width: 55%;
        }

        footer p{
            padding-top: 2.4em;
        }

    }

    /* iPad Pro */
    @media screen and (min-width: 1024px){
        main {
            width: 45%;
        }

        footer p{
            padding-top: 3.4em;
        }
    }

    /* Generic Laptop */
    @media screen and (min-width: 1280px){
        main {
            width: 35%;
        }

        footer p{
            padding-top: 3em;
        }
    }

    /* Desktop */
    @media screen and (min-width: 1920px){
        main{
            width: 25%;
        }

        footer p{
            padding-top: 2.4em;
        }
    }

    /* INDEXMENU */
    .menu{
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 2px solid rgb(226, 226, 226);
    }

    .menu button{
        background: #FCFCFC;
        border: 0;
        width: 100%;
        margin: 0;
        font-size: 1.4em;
        cursor: pointer;
        padding-top: .4em;
        padding-bottom: .4em;
    }

    .menu button:hover{
        background: rgb(199, 241, 241);
    }

    .start{
        width: 50%;
        border-right: 1px solid rgb(226, 226, 226);
    }

    .start button{
        border-top-left-radius: 8px;
    }

    .end{
        width: 50%;
        text-align: end;
        border-left: 1px solid rgb(226, 226, 226);
    }

    .end button{
        border-top-right-radius: 8px;
    }

    .current button{
        background: #e0f1f1;
    }
</style>

<main>
    <h1>{activePage.toUpperCase()}</h1>
    
    {#if activePage === "login"}
    <div class="menu">
        <div class="start">
            <div class="current">
                <button on:click={() => {activePage="login"}}>LOGIN</button>
            </div>
        </div>
        <div class="end">
            <button on:click={() => {activePage="register"}}>REGISTER</button>
        </div>
    </div>
    {:else if activePage === "register"}
    <div class="menu">
        <div class="start">
            <button on:click={() => {activePage="login"}}>LOGIN</button>
        </div>
        <div class="end">
            <div class="current">
                <button on:click={() => {activePage="register"}}>REGISTER</button>
            </div>
        </div>
    </div>
    {/if}
    
    {#if activePage === "login"}
        <Login />
    {:else if activePage === "register"}
        <Register />
    {/if}
</main>
<footer>
    <p>Copyright 2021 - <a href="https://ignurof.xyz" target="_blank">ignurof.xyz</a></p>
</footer>