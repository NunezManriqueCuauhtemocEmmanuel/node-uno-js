<template>
    <Popup>
        <template v-slot:topRow>
            <div class="card-float">
                <CardTemplate :type="'r'+getNumber()" :clickHandler="click" hover="true"></CardTemplate>
            </div>
            <div class="card-float">
                <CardTemplate :type="'y'+getNumber()" :clickHandler="click" hover="true"></CardTemplate>
            </div>
            <div class="card-float">
                <CardTemplate :type="'g'+getNumber()" :clickHandler="click" hover="true"></CardTemplate>
            </div>
            <div class="card-float">
                <CardTemplate :type="'b'+getNumber()" :clickHandler="click" hover="true"></CardTemplate>
            </div>                        
        </template>
    </Popup>
</template>

<script>

    import Popup from "./Popup"
    import CardTemplate from "../components/CardTemplate"

    export default {
        name: "PopupSpecial",
        props:['clickHandler', 'card'],
        components: {Popup, CardTemplate},
        methods:{
            getNumber:function(){
                return this.card.type.charAt(1);
            },
            click:function(cardType){
                this.clickHandler(this.card.id, cardType);
            }
        }
    }
</script>

<style scoped>
    .card-float{
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>