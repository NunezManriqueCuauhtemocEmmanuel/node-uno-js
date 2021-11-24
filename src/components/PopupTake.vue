<template>
    <Popup>
        <template v-slot:topRow>
            <div class="card-center">
                <CardTemplate :type="card.type"></CardTemplate>
            </div>
        </template>
        <template v-slot:bottomRow>
            <div class="button-float" id="col">
                <Button faIcon="arrow-circle-up" :clickHandler="leave">Colocar</Button>
            </div>
            <div class="button-float" id="tom">
                <Button faIcon="arrow-circle-down" :clickHandler="takeHandler">Tomar</Button>
            </div>            
        </template>        
    </Popup>
</template>

<script>

    import Popup from "./Popup"
    import CardTemplate from "./CardTemplate" 
    import Button from "./Button"

    export default {
        name: "PopupTake",
        props:['takeHandler','leaveHandler','card'],
        components: {Popup, CardTemplate, Button},
        methods:{
            leave:function(){
                this.leaveHandler(this.card.id);
            }
        }
    }
</script>

<style scoped>
    .card-center{
        display: inline-block;
    }
    .button-float{
        display: inline-block; 
        margin-left: 15px;       
        margin-right: 15px;               
        margin-top: 20px;
    }
    #col{
        background: #2461b5;
    }
    #tom{
        background: #b52424;
    }
</style>