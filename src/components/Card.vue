<template>
    <div class="card" :class="hoverable" ref="animateCard">
        <div class="inner" :class="innerClass" ref="animateFlip" @click="click">
            <div class="card-front-face">                
                <CardTemplate :type="card.type"></CardTemplate>
                <div v-if="showOverlay" class="overlay"></div>
            </div>
            <div class="card-back-face"></div>
        </div>
    </div>
</template>

<script>

    import CardTemplate from "../components/CardTemplate"

    export default {
        name: "Card",
        props: {
            clickHandler:{ type:Function },
            transitionFinishHandler:{ type:Function },
            card: { type: Object },
            timeline: { type: Object },
            active: {type: Boolean}
        },        
        components:{CardTemplate},
        watch:{ 
            'card.transform': {
                handler: function (after, before) {
                    this.transformAnimate();
                },
                deep: true
            }  
        },
        computed:{
            innerClass:function(){
                return this.card.type?'':'hidden';
            },
            hoverable:function(){
                return (this.card.nextMoveValid && this.active)?'card-hoverable':'';
            },
            showOverlay:function(){
                return (!this.card.nextMoveValid && this.active && this.card.owner !== 'dsc');
            }
        },
        methods:{
            click:function(){
                this.clickHandler(this.card);
            },
            transitionFinish:function(){
                this.transitionFinishHandler(this.card);
            },
            transformAnimate:function(){
                if(typeof this.card.transform !== 'undefined'){
                    let parent = this;
                    this.timeline.to(this.$refs.animateCard, 
                        {
                            x: this.card.transform.x, 
                            y: this.card.transform.y,
                            z: this.card.transform.z,
                            rotation:this.card.transform.angle,
                            scaleX: this.card.transform.scale, 
                            scaleY: this.card.transform.scale,
                            duration: this.card.transform.d,
                            onComplete:parent.transitionFinish
                        });                 
                }
            }
        },
        mounted:function(){
            this.transformAnimate();
        }
    }
</script>
 
<style scoped>
    .card{
        position:absolute;
        width:93px;
        height:140px;
        background-color: transparent;
        perspective: 1000px;
        transform-origin: 0px 70px;
        top:0;
        left:0;
    }
    .card-hoverable .inner:hover{
        box-shadow: 0px 0px 1px 5px rgba(255,234,0,1);
    }     
    .overlay{
        display:block;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        border-radius:8px;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;        
        background-color: rgba(0, 0, 0, 0.4);
    }  
    .inner{
        left:-46px;
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 1.0s;
        transform-style: preserve-3d;
        transform-origin: 0px 70px;
        border-radius:8px;
    }
    .inner.hidden{
        transform: rotateY(-180deg) translateX(-93px);
    }
    .card-front-face{
        color: black;
        display:block;
        position:absolute;
        width:93px;
        height:140px;
        border-radius:8px;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    .card-back-face{
        color: white;
        display:block;
        position:absolute;
        width:93px;
        height:140px;
        border-radius:8px;
        background:url('../../public/img/back.png') no-repeat;
        background-size:100% 100%;        
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: rotateY(180deg);
    }   

</style>