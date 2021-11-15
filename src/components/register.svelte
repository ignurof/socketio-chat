<script>

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    h1{
        margin: 0 auto;
        margin-top: 1em;
        font-size: 4em;
        color: #FFFFFF;
    }

    .register{
        background: #FCFCFC;
        border-radius: 8px;
        width: 100%;
        height: 80%;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.24);
        margin-bottom: 1em;
        display: flex;
        flex-direction: column;
    }

    .space{
        margin-top: 1em;
    }

    legend{
        font-size: 1.2em;
        font-family: 'Rubik';
        font-weight: bold;
        margin: 0 auto;
        margin-top: 2em;
    }

    input{
        border: 0;
        border-radius: 8px;
        background: #e4f4f7;
        width: 70%;
        height: 8%;
        margin: 0;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.2em;
    }

    button{
        border: 0;
        padding: 0;
        font-size: 2em;
        margin-top: .8em;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        height: 14%;
        color: white;
        border-radius: 64px;
        background-image: linear-gradient(to right, #47cff8, #4de0b4);
        box-shadow: 0px 6px 6px #bf78fe41;
        cursor: pointer;
    }

    button:hover{
        background-image: linear-gradient(to right, #6bd7f8, #62e2bc);
    }

    /* RESPONSIVENESS , top of order is more important, so specific goes at the top*/
    /* iPhone X */
    @media screen and (min-width: 375px){
        .register{
            height: 65%;
        }
        
        button{
            margin-top: 1.4em;
        }
    } 

    /* Pixel 2 */
    @media screen and (min-width: 411px){
        .register{
            height: 70%;
        }

        button{
            margin-top: 1.2em;
        }
    }
    
    /* iPad */
    @media screen and (min-width: 768px) {
        .register{
            height: 65%;
        }

        .space{
            margin-top: 2em;
        }

        button{
            margin-top: 2.2em;
        }
    }


    /* iPad Pro */
    @media screen and (min-width: 1024px){
        .register{
            height: 50%;
        }

        button{
            margin-top: 2.4em;
        }
    }

    /* Generic Laptop */
    @media screen and (min-width: 1280px){
        .register{
            height: 60%;
        }

        button{
            margin-top: 1.4em;
        }
    }

    /* Desktop */
    @media screen and (min-width: 1920px){
        button{
            margin-top: 1.4em;
        }
    }
</style>

<h1>REGISTER</h1>

<div class="register">
    <div class="space"></div>
    <legend>USERNAME</legend>
    <input type="text" />

    <legend>EMAIL</legend>
    <input type="text" />

    <legend>PASSWORD</legend>
    <input type="text" />

    <button>Sign Up</button>
</div>