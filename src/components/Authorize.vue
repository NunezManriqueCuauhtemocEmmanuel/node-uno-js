<template>
    <div class="login-box" v-if="!client.code">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/UNO_Logo.svg">
        <div class="row">
            <input type="text" placeholder="Codigo" class="input" v-model="room"/>
        </div>
        <div class="row">
            <input type="text" placeholder="Usuario" class="input" v-model="client.name"/>
        </div>        
        <div class="row">
            <Button faIcon="sign-in-alt" :clickHandler="login">Entrar</Button>
        </div>
    </div>
</template>

<script>

    import Button from "./Button"

    export default {
        name: "Authorize",
        props: ['client', 'socket'],
        components: {Button},
        data: function() {
            return {
                error:false,
                room:null
            }
        },
        methods:{
            login:function () {
                if(this.client.name.length > 0) {
                    this.socket.emit('create', this.room);
                    this.socket.emit('login', {'client': this.client});                    
                    //this.$cookies.set('client',{name:this.client.name, room:this.room});
                }
            }
        },
        mounted:function () {               
            // if(this.$cookies.isKey('client')){
            //     let data = this.$cookies.get('client');
            //     this.client.name = data.name;
            //     this.room = data.room;
            //     this.login();
            // }
        }
    }
</script>

<style scoped>
    .login-box{
        top:100px;
        position:relative;
        width:500px;
        height:auto;
        margin:0 auto;
    }
    img{
        width: 500px;
    }
    .row{
        width:100%;
        position:relative;
        margin-top:30px;
        margin-bottom:30px;
        text-align: center;
    }
    .input{
        display: block;
        position:relative;
        width:200px;
        height:28px;
        line-height: 28px;
        font-size:18px;
        margin:auto;           
    }
    input{
        padding:5px;
        border:none;
        border-bottom:solid 1px #d4cda4;
        color:#ffffff;
        font-weight:bold;
        width:150px;
        margin:5px;
        cursor: pointer;
        text-shadow:0 1px 0 #000;
        background: #777777;        
    }
    .error{
        position:absolute;
        left:0;
        right:0;
        top:50%;
        margin-top:-30px;
        height:60px;
        background:rgba(180,0,0,0.7);
        color:#ffffff;
        font-weight:bold;
        font-size:18px;
        line-height:60px;
        text-align:center;
        z-index:100;
        box-shadow:0 2px 6px rgba(0,0,0, 0.5);
    }
</style>