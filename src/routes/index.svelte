<script>
    import Chat from "../components/chat.svelte";
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    main{
        margin: 0 auto;
        width: 90%;
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
        padding-top: 3em;
        font-size: 2em;
    }

    footer a{
        text-decoration: none;
        color: #EFEFEF;
    }

    /* RESPONSIVENESS */
    /* Desktop */
    @media screen and (min-width: 1026px) {
        main{
            width: 60%;
        }
    }
    
</style>

<main>
    <Chat />
</main>
<footer>
    Copyright 2021 - <a href="https://ignurof.xyz" target="_blank">ignurof.xyz</a>
</footer>