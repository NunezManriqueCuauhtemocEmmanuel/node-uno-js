export default {
    data: function () {
      return {
        state:{
            client:{
                name:'',
                code:null
            }
        }
      }
    },
    computed:{
        self:function(){
            return this.state.client.name;
        }
    },
    methods:{
        ready:function () {
            this.state.client.ready = true;
            this.socket.emit('begin', {'client': this.state.client});
        }        
    }
}