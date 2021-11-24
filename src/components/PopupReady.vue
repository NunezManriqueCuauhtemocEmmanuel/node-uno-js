<template>
    <Popup>
        <template v-slot:topRow>
            <div class="wait-message">Espera a que los participantes esten listos</div>  
        </template>
        <template v-slot:bottomRow v-if="showButton">
            <div class="spacer"></div>
            <Button faIcon="paper-plane" :clickHandler="buttonHandler">¿Listo?</Button>
        </template>
    </Popup>
</template>

<script>

    import Popup from "./Popup"
    import Button from "./Button"

    export default {
        name: "PopupReady",
        props:['buttonHandler', 'showButton'],
        components: {Popup, Button}
    }
</script>

<style scoped>
    .wait-message{
        text-align: center;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        filter: drop-shadow(0px 4px 4px black); 
        height:50px;
        line-height:45px;
        font-size: 18px;
        background: linear-gradient(to bottom, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;         
    }     
    .spacer{
        margin-top:30px;
    }
</style>