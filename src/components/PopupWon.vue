<template>
    <Popup>
        <template v-slot:topRow>
            <div class="won-message">{{winner}} Ganaste</div>  
        </template>
        <template v-slot:bottomRow v-if="showButton">
            <Button faIcon="paper-plane" :clickHandler="buttonHandler">Siguiente ronda</Button>
        </template>
    </Popup>
</template>

<script>

    import Popup from "./Popup"
    import Button from "./Button"

    export default {
        name: "PopupWon",
        components: {Popup, Button},
        props:['buttonHandler', 'winner', 'showButton']
    }
</script>

<style scoped>
    .won-message{
        text-align: center;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        filter: drop-shadow(0px 4px 4px black); 
        height:50px;
        line-height:50px;
        font-size: 24px;
        background: linear-gradient(to bottom, rgba(248,80,50,1) 0%, rgba(241,111,92,1) 50%, rgba(246,41,12,1) 51%, rgba(240,47,23,1) 71%, rgba(231,56,39,1) 100%);        
        background-clip: text;
        -webkit-text-fill-color: transparent;        
        margin-bottom:30px;
    }     
</style>