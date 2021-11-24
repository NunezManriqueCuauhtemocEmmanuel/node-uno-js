<template>
    <div>
        <UnoGame :socket="socket"></UnoGame>
    </div>
</template>

<script>

    import socket from 'socket.io-client'    
    import UnoGame from "./UnoGame"

    export default {
        name: "clientApp",
        data: function() {
            return {               
                socket: socket("http://" + window.location.hostname + ":" + window.location.port),
            }
        },
        components: {
            UnoGame
        },
    }
</script>

<style scoped>

</style>

<style>
    body {
        background: url(https://www.wallpapertip.com/wmimgs/16-164758_uno-backgrounds.jpg);
        background-size: 100vw 100vh;
        background-repeat: repeat;
        background-attachment: fixed;
        margin:0 auto;
        width:100%;
        font: 12px normal Verdana, Arial, Helvetica, sans-serif;
        user-select: none;
        overflow: hidden;
        transform: scale(1.0);
    }
    a{
        text-decoration:none;
        color:inherit;
    }

</style>