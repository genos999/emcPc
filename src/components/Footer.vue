<template>
	<div class="cont">
		<div class="ad">
			<img class="img" src="img/ad.png" v-if="showf">
			<img class="close" src="img/close.png" @click="close($event,1)" v-if="showf">
		</div>
		<div class="mains">
			<div class="art">
				<div class="act">
					<span @click="tiv=1" :class="tiv==1?'active':''">专家介绍</span>
					<span @click="tiv=2" :class="tiv==2?'active':''">会议日程</span>
					<span @click="tiv=3" :class="tiv==3?'active':''">免责声明</span>
				</div>
				<div class="p30" v-if="tiv==1" v-cloak>
					<img src="img/zj1.png">
					<img src="img/zj2.png">
					<img src="img/zj3.png">
					<img src="img/zj4.png">
					<img src="img/zj5.png">
					<img src="img/zj6.png">
					<img src="img/zj7.png">
					<img src="img/zj8.png">
					<img src="img/zj9.png">
					<img src="img/zj10.png">
					<img src="img/zj11.png">
				</div>
				<div class="p30" v-else-if="tiv==2" v-cloak>
					<img src="img/hy1.png">
					<img src="img/hy2.png">
					<img src="img/hy3.png">
				</div>
				<div class="p30" v-else v-cloak>
					<img src="img/sm1.png">
					<img src="img/sm2.png">
					<img src="img/sm3.png">
				</div>
			</div>
		</div>
		<div class="ads">
			<img class="img" src="img/ad.png" v-if="shows">
			<img class="close" src="img/close.png" @click="close($event,2)" v-if="shows">
		</div>
	</div>
</template>
<script>
import '../assets/scss/style.css';
export default {
  name: 'Chat',
  data(){
      return{
		showf:true,
		shows:true,
		tiv:1,
      }
  },
  methods:{
	close:function(e,i){
		var thar = this;
		if(i==1){
			thar.showf = false;
		}else{
			thar.shows = false;
		}
	},
  },
  created(){
    
  }
}
</script>
<style scoped>
.cont{width: 98%;margin: 0 auto;display: flex;justify-content: space-around;margin-top: 1%;}
.cont .ad{width: 23%;float: left;margin: unset;position: relative;}
.cont .mains{width: 55%;height: auto;float: left;background: #fff;margin: 0 0.5%;}
.cont .ads{width: 23%;float: left;margin: unset;position: relative;}
.cont .ad .img,.cont .ads .img{width: 100%;margin-top: 60px;margin-top: 145px;opacity: 0.7;}
.cont .ad .close,.cont .ads .close{position: absolute;right: 5px;top: 155px;width: 25px;cursor: pointer;}
.cont .mains .art{padding: 30px 80px;}
.cont .mains .art .act span{width: 33.33%;background: #dfebf1;display: block;float: left;text-align: center;cursor: pointer;}
.cont .mains .art .act span.active{background: #9fe3ff;}
.cont .mains .art img{width:100%;vertical-align: bottom;}
.p30{clear:both;padding-top: 15px;}
</style>
