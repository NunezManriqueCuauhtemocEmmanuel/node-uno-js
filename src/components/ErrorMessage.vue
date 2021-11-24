<template>

</template>

<script>
    export default {
        name: "ErrorMessage",
        props: ['messages']
    }
</script>

<style scoped>
    .error-message{
        display:block;
        position: absolute;
        width: 100%;
        height:40px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(255,0,0,0.5);
        color:yellow;
        font-weight: bolder;
    }
</style>