<template>
    <div class="name" :style="transform">
        <div class="client-name" :class="{active:client.turn}">
            <span>{{client.name}}</span>
        </div>
    </div>    
</template>

<script>
    export default {
        name: "NamePlate",
        props: ['client', 'position'],
        computed:{
            transform:function(){                
                return {
                    transform:'translate3d('+this.position.x+'px, '+this.position.y+'px, 300px)'
                };
            }
        }
    }
</script>

<style scoped>
    .name{
        width:150px;
        height:35px;
        position:absolute;
        left:0;
        top:0;
    }
    .client-name{
        width:150px;
        height:35px;
        line-height:35px;
        position:relative;
        left:-75px;
        top:0;
        text-align: center;
        vertical-align: top;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        font-size: 24px;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        filter: drop-shadow(0px 5px 3px black);
        background: linear-gradient(to bottom, rgba(252,234,187,1) 0%, rgba(252,205,77,1) 61%, rgba(248,181,0,1) 62%, rgba(251,223,147,1) 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        opacity: 0.6;
    }
    .client-name.active{
        opacity: 1;
    }
    .client-name span{
        line-height: 25px;
        /*border-bottom:solid 4px rgba(252,205,77,.3);*/
        padding-left: 40px;
        padding-right: 40px;
        border-bottom: none;
    }
    .hand-cards-transform{
        position: absolute;
        transform: translate(350px,580px);
    }
    .client-name.active span{
        background: linear-gradient(to bottom, rgba(241,231,103,0) 0%, rgba(254,182,69,0.2) 100%);
        border-bottom:solid 4px rgba(255, 251, 0, 0.8);
    }
</style>