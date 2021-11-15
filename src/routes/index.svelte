<script>
    import Chat from "../components/chat.svelte"; // <Chat {chatHistory}/>
    //export let chatHistory = [];

    import Register from "../components/register.svelte"; // <Register />
    import Login from "../components/login.svelte"; // <Login />
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
            width: 50%;
        }

        footer p{
            padding-top: 2.4em;
        }

    }

    /* iPad Pro */
    @media screen and (min-width: 1024px){
        main {
            width: 40%;
        }

        footer p{
            padding-top: 3.4em;
        }
    }

    /* Generic Laptop */
    @media screen and (min-width: 1280px){
        main {
            width: 30%;
        }

        footer p{
            padding-top: 3em;
        }
    }

    /* Desktop */
    @media screen and (min-width: 1920px){
        main{
            width: 20%;
        }

        footer p{
            padding-top: 2.4em;
        }
    }
</style>

<main>
    <Register />
</main>
<footer>
    <p>Copyright 2021 - <a href="https://ignurof.xyz" target="_blank">ignurof.xyz</a></p>
</footer>