<script>
    //export let chatHistory = [];
    import Register from "../components/register.svelte"; // <Register />
    import Login from "../components/login.svelte"; // <Login />

    let activePage = "login";
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

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