<template>
    <div class="playing_card" @click="clickHandler?clickHandler(type):null" :class="[type, hoverable]"><div></div><div></div><div></div></div>
</template>

<script>
    export default {
        name: "CardTemplate",
        props: ['type', 'clickHandler', 'hover'],
        computed:{
            hoverable:function(){return (this.hover === 'true') ? 'card-hoverable' : '';}
        }
    }
</script>

<style scoped>
    .playing_card{
        display:block;
        position:relative;
        border-radius:8px;
        width:93px;
        height:140px;
        box-shadow:-3px -4px 3px rgba(0,0,0,0.3);
    }
    .card-hoverable:hover{
        box-shadow: 0px 0px 1px 5px rgba(255,234,0,1);
    }     
    .r0,.r1,.r2,.r3,.r4,.r5,.r6,.r7,.r8,.r9,.rp,.rn,.rr,.rc,.rg{
        background:url('../../public/img/outl.png') no-repeat, url('../../public/img/grad.png') repeat-x 0 6px;
    }
    .g0,.g1,.g2,.g3,.g4,.g5,.g6,.g7,.g8,.g9,.gp,.gn,.gr,.gc,.gg{
        background:url('../../public/img/outl.png') no-repeat, url('../../public/img/grad.png') repeat-x 0 -122px;
    }
    .b0,.b1,.b2,.b3,.b4,.b5,.b6,.b7,.b8,.b9,.bp,.bn,.br,.bc,.bg{
        background:url('../../public/img/outl.png') no-repeat, url('../../public/img/grad.png') repeat-x 0 -250px;
    }
    .y0,.y1,.y2,.y3,.y4,.y5,.y6,.y7,.y8,.y9,.yp,.yn,.yr,.yc,.yg{
        background: url('../../public/img/outl.png') no-repeat, url('../../public/img/grad.png') repeat-x 0 -378px;
    }
    .kg,.kc{
        background: url('../../public/img/outl.png') no-repeat, url('../../public/img/grad.png') repeat-x 0 -506px;
    }
    .playing_card>div:nth-child(1){
        position:absolute;
        top:9px;
        left:9px;
    }
    .playing_card>div:nth-child(2){
        position:absolute;
        bottom:8px;
        right:9px;
    }
    .playing_card>div:nth-child(3){
        position:absolute;
        top:35px;
        left:11px;
        width:69px;
        height:74px;
    }
    .r0>div:nth-child(1),.r0>div:nth-child(2),
    .g0>div:nth-child(1),.g0>div:nth-child(2),
    .b0>div:nth-child(1),.b0>div:nth-child(2),
    .y0>div:nth-child(1),.y0>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat;
    }
    .r0>div:nth-child(3),
    .g0>div:nth-child(3),
    .b0>div:nth-child(3),
    .y0>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat;
    }
    .r1>div:nth-child(1),.r1>div:nth-child(2),
    .g1>div:nth-child(1),.g1>div:nth-child(2),
    .b1>div:nth-child(1),.b1>div:nth-child(2),
    .y1>div:nth-child(1),.y1>div:nth-child(2){
        width:11px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -13px 0;
    }
    .r1>div:nth-child(3),
    .g1>div:nth-child(3),
    .b1>div:nth-child(3),
    .y1>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -69px 0;
    }
    .r2>div:nth-child(1),.r2>div:nth-child(2),
    .g2>div:nth-child(1),.g2>div:nth-child(2),
    .b2>div:nth-child(1),.b2>div:nth-child(2),
    .y2>div:nth-child(1),.y2>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -24px 0;
    }
    .r2>div:nth-child(3),
    .g2>div:nth-child(3),
    .b2>div:nth-child(3),
    .y2>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -138px 0;
    }
    .r3>div:nth-child(1),.r3>div:nth-child(2),
    .g3>div:nth-child(1),.g3>div:nth-child(2),
    .b3>div:nth-child(1),.b3>div:nth-child(2),
    .y3>div:nth-child(1),.y3>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -37px 0;
    }
    .r3>div:nth-child(3),
    .g3>div:nth-child(3),
    .b3>div:nth-child(3),
    .y3>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -207px 0;
    }
    .r4>div:nth-child(1),.r4>div:nth-child(2),
    .g4>div:nth-child(1),.g4>div:nth-child(2),
    .b4>div:nth-child(1),.b4>div:nth-child(2),
    .y4>div:nth-child(1),.y4>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -50px 0;
    }
    .r4>div:nth-child(3),
    .g4>div:nth-child(3),
    .b4>div:nth-child(3),
    .y4>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -276px 0;
    }
    .r5>div:nth-child(1),.r5>div:nth-child(2),
    .g5>div:nth-child(1),.g5>div:nth-child(2),
    .b5>div:nth-child(1),.b5>div:nth-child(2),
    .y5>div:nth-child(1),.y5>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -63px 0;
    }
    .r5>div:nth-child(3),
    .g5>div:nth-child(3),
    .b5>div:nth-child(3),
    .y5>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -345px 0;
    }
    .r6>div:nth-child(1),.r6>div:nth-child(2),
    .g6>div:nth-child(1),.g6>div:nth-child(2),
    .b6>div:nth-child(1),.b6>div:nth-child(2),
    .y6>div:nth-child(1),.y6>div:nth-child(2){
        width:14px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -76px 0;
    }
    .r6>div:nth-child(3),
    .g6>div:nth-child(3),
    .b6>div:nth-child(3),
    .y6>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -414px 0;
    }
    .r7>div:nth-child(1),.r7>div:nth-child(2),
    .g7>div:nth-child(1),.g7>div:nth-child(2),
    .b7>div:nth-child(1),.b7>div:nth-child(2),
    .y7>div:nth-child(1),.y7>div:nth-child(2){
        width:11px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -90px 0;
    }
    .r7>div:nth-child(3),
    .g7>div:nth-child(3),
    .b7>div:nth-child(3),
    .y7>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -483px 0;
    }
    .r8>div:nth-child(1),.r8>div:nth-child(2),
    .g8>div:nth-child(1),.g8>div:nth-child(2),
    .b8>div:nth-child(1),.b8>div:nth-child(2),
    .y8>div:nth-child(1),.y8>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -101px 0;
    }
    .r8>div:nth-child(3),
    .g8>div:nth-child(3),
    .b8>div:nth-child(3),
    .y8>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -552px 0;
    }
    .r9>div:nth-child(1),.r9>div:nth-child(2),
    .g9>div:nth-child(1),.g9>div:nth-child(2),
    .b9>div:nth-child(1),.b9>div:nth-child(2),
    .y9>div:nth-child(1),.y9>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -114px 0;
    }
    .r9>div:nth-child(3),
    .g9>div:nth-child(3),
    .b9>div:nth-child(3),
    .y9>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -621px 0;
    }
    .rp>div:nth-child(1),.rp>div:nth-child(2),
    .gp>div:nth-child(1),.gp>div:nth-child(2),
    .bp>div:nth-child(1),.bp>div:nth-child(2),
    .yp>div:nth-child(1),.yp>div:nth-child(2){
        width:24px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -127px 0;
    }
    .rp>div:nth-child(3),
    .gp>div:nth-child(3),
    .bp>div:nth-child(3),
    .yp>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -828px 0;
    }
    .rr>div:nth-child(1),.rr>div:nth-child(2),
    .gr>div:nth-child(1),.gr>div:nth-child(2),
    .br>div:nth-child(1),.br>div:nth-child(2),
    .yr>div:nth-child(1),.yr>div:nth-child(2){
        width:13px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -193px 0;
    }
    .rr>div:nth-child(3),
    .gr>div:nth-child(3),
    .br>div:nth-child(3),
    .yr>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -759px 0;
    }
    .rn>div:nth-child(1),.rn>div:nth-child(2),
    .gn>div:nth-child(1),.gn>div:nth-child(2),
    .bn>div:nth-child(1),.bn>div:nth-child(2),
    .yn>div:nth-child(1),.yn>div:nth-child(2){
        width:18px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -175px 0;
    }
    .rn>div:nth-child(3),
    .gn>div:nth-child(3),
    .bn>div:nth-child(3),
    .yn>div:nth-child(3){
        background:url('../../public/img/symbols.png') no-repeat -690px 0;
    }
    .rg>div:nth-child(1),.rg>div:nth-child(2),
    .gg>div:nth-child(1),.gg>div:nth-child(2),
    .bg>div:nth-child(1),.bg>div:nth-child(2),
    .yg>div:nth-child(1),.yg>div:nth-child(2),
    .kg>div:nth-child(1),.kg>div:nth-child(2){
        width:24px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -151px 0;
    }
    .rg>div:nth-child(3),
    .gg>div:nth-child(3),
    .bg>div:nth-child(3),
    .yg>div:nth-child(3),
    .kg>div:nth-child(3){
        width:70px;
        height:76px;
        top:33px;
        left:11px;
        background:url('../../public/img/symbols_s.png') no-repeat -74px 0;
    }
    .rc>div:nth-child(1),.rc>div:nth-child(2),
    .gc>div:nth-child(1),.gc>div:nth-child(2),
    .bc>div:nth-child(1),.bc>div:nth-child(2),
    .yc>div:nth-child(1),.yc>div:nth-child(2),
    .kc>div:nth-child(1),.kc>div:nth-child(2){
        width:14px;
        height:20px;
        background:url('../../public/img/symbols_sm.png') no-repeat -206px 0;
    }
    .rc>div:nth-child(3),
    .gc>div:nth-child(3),
    .bc>div:nth-child(3),
    .yc>div:nth-child(3),
    .kc>div:nth-child(3){
        width:74px;
        height:92px;
        top:24px;
        left:9px;
        background:url('../../public/img/symbols_s.png') no-repeat 0 0;
    }

</style>