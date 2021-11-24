<template>
    <div class="popup">
        <div class="row">
            <slot name="topRow"></slot>
        </div>
        <div class="row">
            <slot name="bottomRow"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
    }
</script>

<style scoped>
    .popup{
        width:100%;
        height:auto;
        position:relative;
        left:0;
        margin:0;
        padding:0;
        top:410px;
        background: rgba(0,0,0,0.6);
        /*border:solid 1px red;*/
    }
    .popup:before{
        content:"";
        display: block;
        width:100%;
        height:20px;
        top:-20px;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }
    .popup:after{
        content:"";
        display: block;
        width:100%;
        height:20px;
        bottom:-20px;
        background: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }   
    .popup .row{
        display: block;
        width:100%;
        position: relative;
        text-align: center;
        /*border:solid 1px blue;*/
    }    
</style>