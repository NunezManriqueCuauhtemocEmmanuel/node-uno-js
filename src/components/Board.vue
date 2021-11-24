<template>
    <div class="table">
        <div class="grad"></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Board"
    }
</script>

<style scoped>
    .table{
        position:absolute;
        width:700px;
        height:100%;        
        border-radius:12px;
        transform-style: preserve-3d;
    }
    .grad{
        position:relative;
        width:100%;
        height:100px;
    }
</style>