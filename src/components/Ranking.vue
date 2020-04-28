<template>
  <div class="rank">
    <div class="title">排行榜</div>
    <div class="aleft">
      <div class="tab">
        <span v-for="(t,i) in tab" :key='i' v-text="t" @click="act=i+1" :class="act==i+1?'active':''"></span>
      </div>
      <div class="tabCon">
        <div v-if="act==1" v-cloak>
          <ul>
            <li v-for="(t,i) in guest" :key='i'>
              <span v-text='i+1'></span>
              <span><img src="img/icon.png"></span>
              <span v-text='t.NickName'></span>
              <span v-text='t.paly_money'></span>
            </li>
          </ul>
        </div>
        <div v-else-if="act==2" v-cloak>
          <ul>
            <li v-for="(t,i) in pro" :key='i'>
              <span v-text='i+1'></span>
              <span><img src="img/icon.png"></span>
              <span v-text='t.NickName'></span>
              <span v-text='t.paly_money'></span>
            </li>
          </ul>
        </div>
        <div v-else v-cloak>
          <ul>
            <li v-for="(t,i) in audience" :key='i'>
              <span v-text='i+1'></span>
              <span><img src="img/icon.png"></span>
              <span v-text='t.NickName'></span>
              <span v-text='t.paly_money'></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/scss/style.css';
export default {
  name: 'Ranking',
  props: {
    MeetId: ''
  },
  data(){
      return{
        url:'http://emcapi.e-lab.cn/data.php',
        tab:[],
        act:1,
        guest:[],
        pro:[],
        audience:[],
      }
  },
  methods:{
    getTab:function(){
      var thar = this;
        this.$axios({
          method:"get",
          url:thar.url,
          params:{type:'tab'}
      }).
      then((res)=>{
          if(res.data.code==200){
            thar.tab = res.data.data;
        }
      },(err)=>{
          console.log(err);
      })
    },
    getGuest:function(){
      var thar = this;
      this.$axios({
        method:'get',
        url:process.env.VUE_APP_BASE_URL+'/EMc/MeetingTop/'+this.$parent.$data.MeetId+'/Revenues',
        headers:{
          'UserGuid':window.localStorage.getItem('UserGuid'),
          'Authorization':'Bearer '+window.localStorage.getItem('Token'),
        },
      }).
      then((res)=>{
        thar.person = res.data.data;
      },(err)=>{
          console.log(err);
      })
    },
    getPro:function(){
      var thar = this;
      this.$axios({
        method:'get',
        url:process.env.VUE_APP_BASE_URL+'/EMc/MeetingTop/'+this.$parent.$data.MeetId+'/Product',
        headers:{
          'UserGuid':window.localStorage.getItem('UserGuid'),
          'Authorization':'Bearer '+window.localStorage.getItem('Token'),
        },
      }).
      then((res)=>{
        thar.pro = res.data.data;
      },(err)=>{
          console.log(err);
      })
    },
    getAudience:function(){
      var thar = this;
      this.$axios({
        method:'get',
        url:process.env.VUE_APP_BASE_URL+'/EMc/MeetingTop/'+this.$parent.$data.MeetId+'/PlayTour',
        headers:{
          'UserGuid':window.localStorage.getItem('UserGuid'),
          'Authorization':'Bearer '+window.localStorage.getItem('Token'),
        },
      }).
      then((res)=>{
        thar.audience = res.data.data;
      },(err)=>{
          console.log(err);
      })
    },
  },
  created(){
    this.getTab();
    this.getGuest();
    this.getPro();
    this.getAudience();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main .cent .rank{float: left;padding-bottom: 10px;background: #fff;}
#main .cent .rank .title{text-align: center;background:#cbcbcb;letter-spacing: 2px;}
#main .cent .rank .tab{width: 100%;margin: 0 auto;}
#main .cent .rank .tab span{width: 33.33333%;text-align: center;display: block;float: left;cursor: pointer;}
#main .cent .rank .tab span.active{background:#15b0e9;color:#fff;border-radius: 5px;}
#main .cent .rank .tabCon{width: 90%;margin: 0 auto;}
#main .cent .rank .aleft{background:#fff;}
#main .cent .rank .aleft ul li{overflow: hidden;background: #dfebf1;margin: 15px 0;border-radius:5px;}
#main .cent .rank .aleft ul li:nth-child(1){margin-top: 5px;}
#main .cent .rank .aleft ul li span{color: #858585;}
#main .cent .rank .aleft ul li span img{width: 30px;vertical-align: middle;}
#main .cent .rank .aleft ul li span:nth-child(1){display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(2){width: 30px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(3){margin-left:10px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(4){text-align: right;display: block;padding-right: 7px;}
#main .cent .rank .aleft ul li:hover{background: #9fe3ff;color: #fff;}
</style>
