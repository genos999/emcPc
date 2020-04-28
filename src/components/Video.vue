<template>
	<div class="player">
		<div class="title">
			<div class="t1">
				<img src="img/icon.png">
				<span v-text="vid.meetTitle" v-cloak></span>
			</div>
			<div class="t2">
				<img src="img/person.png">
				<span v-text='vid.hits' v-cloak></span>
			</div>
		</div>
		<div class="acenter">
			<video muted id='videomv' class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls allowfullscreen="true">
	            <source :src="vid.pushStraeamAddress">
	        </video>
	        <vue-baberrage
			   :isShow= "barrageIsShow"
			   :barrageList = "barrageList"
			   :loop = "barrageLoop"
			   >
			</vue-baberrage>
			<div class="control">
				<div class="left">
					<img :src="share==0?'img/share.png':'img/share_on.png'" @mouseover="share=1" @mouseout="share=0" @click="shareImg==1?shareImg=0:shareImg=1">
					<img :src="phone==0?'img/phone.png':'img/phone_on.png'" @mouseover="phone=1;phoneImg=1" @mouseout="phone=0;phoneImg=0">
					<img src="img/full.png" @click="fullscreen">
				</div>
				<div class="right">
					<img class="img" src="img/msg.png" @click="promsy">
					<img class="img" src="img/zan.png" @click="dogift">
					<span class="span">弹幕</span>
					<input id="check" type="checkbox" ref="check">
					<label class="label" for="check" @click="check($event)"></label>
					<div class="proms" v-if="proms" v-cloak>
						<p>互动申请</p>
						<p class="form"><input type="text" v-model="formData.InterName" placeholder="请输入你的名字"></p>
						<p class="form"><input type="text" v-model="formData.InterWork" placeholder="请输入你的单位"></p>
						<p class="form"><input type="text" v-model="formData.InterPhone" placeholder="请输入你的电话"></p>
						<p class="form"><textarea placeholder="申请内容" v-model="formData.Content"></textarea></p>
						<button @click="submit">提交申请</button>
					</div>
					<div class="gift" v-if="zan" v-cloak>
						<div>
							<div class="giftit">
								<span @click="gifshow=1;divIndex=-1;items.price=0;" :class="gifshow==1?'active':''">礼物1</span>
								<span @click="gifshow=2;divIndex=-1;items.price=0;;" :class="gifshow==2?'active':''">礼物2</span>
								<span @click="gifshow=3;divIndex=-1;items.price=0;;" :class="gifshow==3?'active':''">礼物3</span>
								<span @click="gifshow=4;divIndex=-1;items.price=0;;" :class="gifshow==4?'active':''">礼物4</span>
								<span @click="gifshow=5;divIndex=-1;items.price=0;;" :class="gifshow==5?'active':''">礼物5</span>
							</div>
							<div class="gifmain">
								<li v-for="(g,i) in gifs1" v-if="gifshow==1" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
									<img :src="g.icon">
									<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
									<span class="bak" v-if="divIndex==i?show:!show">
										<img src="img/pus.png" @click="changeNum('-1')">
										<input type="text" v-model="num">
										<img src="img/plus.png" @click="changeNum('1')">
									</span>
								</li>
								<li v-for="(g,i) in gifs2" v-if="gifshow==2" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
									<img :src="g.icon">
									<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
									<span class="bak" v-if="divIndex==i?show:!show">
										<img src="img/pus.png" @click="changeNum('-1')">
										<input type="text" v-model="num">
										<img src="img/plus.png" @click="changeNum('1')">
									</span>
								</li>
								<li v-for="(g,i) in gifs3" v-if="gifshow==3" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
									<img :src="g.icon">
									<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
									<span class="bak" v-if="divIndex==i?show:!show">
										<img src="img/pus.png" @click="changeNum('-1')">
										<input type="text" v-model="num">
										<img src="img/plus.png" @click="changeNum('1')">
									</span>
								</li>
								<li v-for="(g,i) in gifs4" v-if="gifshow==4" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
									<img :src="g.icon">
									<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
									<span class="bak" v-if="divIndex==i?show:!show">
										<img src="img/pus.png" @click="changeNum('-1')">
										<input type="text" v-model="num">
										<img src="img/plus.png" @click="changeNum('1')">
									</span>
								</li>
								<li v-for="(g,i) in gifs5" v-if="gifshow==5" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
									<img :src="g.icon">
									<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
									<span class="bak" v-if="divIndex==i?show:!show">
										<img src="img/pus.png" @click="changeNum('-1')">
										<input type="text" v-model="num">
										<img src="img/plus.png" @click="changeNum('1')">
									</span>
								</li>
							</div>
							<div class="line"></div>
							<div class="topline">
								<div style="width:50%;float:left;"></div>
								<div style="width:50%;float:right;">
									<span>总计：{{items.price?items.price*num:0}}E</span>
									<button @click="dogifts">赠送</button>
								</div>
							</div>
						</div>
					</div>
					<div class="sure" v-if="sure" v-cloak>
						<div class="suremain">
							<a href="javascript:;" class="close" @click="closesure"></a>
							<p>支付</p>
							<ul>
								<li v-for="(t,i) in person" v-cloak @click="actremove($event,i)">
									<span id="check">
										<input type="checkbox" class="input_check" :id="'check'+t.UserGuId">
										<label :class="acts&&i==0?'act label_check':'label_check'" :for="'check'+t.UserGuId"></label>
									</span>
									<img class="head" src="img/icon.png" @click="doimgsure($event,t.UserGuId)">
									<span class="span" v-text="t.NickName"></span>
								</li>
							</ul>
							<div class="total">
								<span>￥{{items.price*num}}×{{personnum}}</span>
								<span>￥{{items.price*num*personnum}}</span>
							</div>
							<div class="way">
								<div class="ways">
									<input type="radio" name="echck" value="wechat" class="input_check1" id="checks1" v-model="checkedValue">
									<label @click="actpay=false" class="label_check1" for="checks1"></label>
									<img src="img/wechat.png">
									<span>微信支付</span>
								</div>
								<div class="ways">
									<input type="radio" name="echck" value="alipay" checked class="input_check2" id="checks2" v-model="checkedValue">
									<label :class="actpay?'act label_check2':'label_check2'" for="checks2" checked></label>
									<img src="img/alipay.png">
									<span>支付宝</span>
									<a>推荐</a>
								</div>
							</div>
							<div class="ofsure">
								<button @click="pay($event)">确认支付</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="shareImg==1" class="share">
				<div class="sharecontent">
					<a href="javascript:;" class="fenxiang abs" @click="copys" :data-clipboard-text="haibao.link" id="copy_texts"></a>
					<img :src="haibao.head" class="head abs">
					<span class="name abs" v-text="haibao.name"></span>
					<img :src="haibao.banner" class="banner abs">
					<span class="titles abs" v-text="haibao.title"></span>
					<span class="time abs" v-text="'会议时间：'+haibao.time"></span>
					<img :src="haibao.code" class="code abs">
					<span class="link abs">{{haibao.link}}<a href="javascript:;" :data-clipboard-text="haibao.link" id="copy_text" @click="copy" style="padding: 0 5px;">复制</a></span>
				</div>
			</div>
			<div v-if="phoneImg==1" class="phone">
				<div class="phonecontent">
					<img :src="phoneItems.code" class="code abs">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video.min.js'
import { MESSAGE_TYPE } from 'vue-baberrage'
import Clipboard from 'clipboard'
import '../assets/scss/style.css';
export default {
  name: 'Ranking',
  props: {
    MeetId: ''
  },
  data(){
      return{
        url:'http://emcapi.e-lab.cn/data.php',
        vid:[],
        share:0,
		shareImg:0,
		phone:0,
		phoneImg:0,
		proms:false,
		formData:{
        	InterName:'',
        	InterPhone:'',
        	InterWork:'',
        	Content:'',
        },
	  	gifshow:1,
		divIndex:-1,
		items:[],
		gifs1:[],
		gifs2:[],
		gifs3:[],
		gifs4:[],
		gifs5:[],
		show:true,
		num:1,
		personnum:1,
		checkedValue:'alipay',
  		actpay:true,
		haibao:[],
		phoneItems:[],
		barrageIsShow: true,
		barrageLoop: false,
		barrageList: [],
  		acts:true,
  		sure:false,
		attr:[0],
		zan:false,
		msg: [],
      }
  },
  methods:{
    fullscreen:function(){
		var player = videojs('videomv', {}, function(){})
		player.requestFullscreen();
	},
	promsy:function(){
		var thar = this;
		if(thar.proms){
			thar.proms = false;
		}else{
			thar.proms = true;
		}
		thar.zan = false;
		thar.emot = false;
	},
	dogift:function(){
		var thar = this;
		if(thar.zan){
			thar.zan=false;
		}else{
			thar.zan = true;
		}
		thar.proms = false;
		thar.emot = false;
		thar.num = 1;
	},
	check:function(e){
		var thar = this;
		if(this.$refs.check.checked){
			thar.barrageIsShow = false;
		}else{
			this.addToList();
			thar.barrageIsShow = true;
		}
	},
	addToList() {
		var thar = this;
		thar.msg.forEach((v) => {
			this.barrageList.push({
				id: v.id,
				avatar: v.avatar,
				msg: v.msg,
				time: v.time
			});
		});
	},
	submit:function(){
		var thar = this;
		var o = {
			'InterType' : 0,
			"InterName": thar.formData.InterName,
			"InterPhone": thar.formData.InterPhone,
			"InterWork": thar.formData.InterWork,
			"Remark": "",
			"MeetId": this.$parent.$data.MeetId,
			"StatusId": 0,
			"Content":thar.formData.Content,
			"AuditClerkName":"",
			"GuestInteractionName":""
		};
		this.$axios({
			method:'post',
			url:'/EMc/InsertMeetInterPut',
			data:o,
			headers:{
				'UserGuid':window.localStorage.getItem('UserGuid'),
				'Authorization':'Bearer '+window.localStorage.getItem('Token'),
			},
		}).
		then((res)=>{
			this.$toast.success({
			    message:'提交成功',
			    position:'bottom center'
			})
		},(err)=>{
		    console.log(err);
		})
	},
	dopostmer:function(o,e,i){
		var thar = this;
		thar.items = o;
		thar.divIndex=i;
	},
	changeNum:function(i){
		var thar = this;
		i = Number(i);
		if(thar.num+i<1){
			thar.num = 1;
		}else{
			thar.num = thar.num+i;
		}
	},

	dogifts:function(){
		var thar = this;
		thar.zan = false;
		thar.sure = true;
	},
	closesure:function(){
		var thar = this;
		thar.sure = false;
	},
	actremove:function(e,i){
		var thar = this;
		if(i==0){
			thar.acts=false;
		}
	},
	doimgsure:function(e,id){
		var thar = this;
		if(thar.attr[0]==thar.attr[1]){
			thar.attr.splice(0,1);
		}
		var change = true;
		if(e.currentTarget.parentElement.firstElementChild.firstElementChild.checked==false){
			e.currentTarget.parentElement.firstElementChild.firstElementChild.checked = true;
			thar.attr.push(id);
		}else{
			e.currentTarget.parentElement.firstElementChild.firstElementChild.checked = false;
			for(var i=0;i<thar.attr.length;i++){
				if(thar.attr[i]==id){
					thar.attr.splice(i,1);
				}
			}
		}
		//小->大排序
		for (var i = 0; i < thar.attr.length; i++) {
			for (var j = 0; j < thar.attr.length; j++) {
				if (thar.attr[i] < thar.attr[j]) {
					var h;
					h = thar.attr[i];
					thar.attr[i] = thar.attr[j];
					thar.attr[j] = h;
				}
			}
		}
		thar.personnum = thar.attr.length;
	},
	pay:function(e){
		var thar = this;
		alert(thar.items.price*thar.num*thar.personnum+','+thar.checkedValue);
	},
	copy:function(){
		var thar = this;
		var clipborad = new Clipboard("#copy_text");
		clipborad.on('success',e=>{
			alert('复制成功，赶快去分享给你的好友吧！');
			clipborad.destroy();
		})
		clipborad.on('error',e=>{
			Message({
				message:'该浏览器暂不支持自动复制',
				type:'warning'
			});
			clipborad.destroy();
		})
	},
	copys:function(){
		var thar = this;
		var clipborad = new Clipboard("#copy_texts");
		clipborad.on('success',e=>{
			alert('复制成功，赶快去分享给你的好友吧！');
			clipborad.destroy();
		})
		clipborad.on('error',e=>{
			Message({
				message:'该浏览器暂不支持自动复制',
				type:'warning'
			});
			clipborad.destroy();
		})
	},
	getPhoneCode:function(){
		var thar = this;
	  	this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'phonecode'}
		}).
		then((res)=>{
			if(res.data.code==200){
		    	thar.phoneItems = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	shareshow:function(){
		var thar = this;
		thar.shareImg = 1;
		if(thar.haibao==''){
			
		}
	},
	phoneshow:function(){
		var thar = this;
		thar.phoneImg = 1;
		if(thar.phoneItems==''){

		}
	},
	getHaibao:function(){
		var thar = this;
	  	this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'haibao'}
		}).
		then((res)=>{
			if(res.data.code==200){
		    	thar.haibao = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getPerson:function(){
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
			thar.person.unshift({"id":0,'ico':'img/icon.png','name':'E-Lab',price:''});
			console.log(res);
		},(err)=>{
		    console.log(err);
		})
	},
	getGifs1:function(){
		var thar = this;
		this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'gifs1'}
		}).
		then((res)=>{
		    if(res.data.code==200){
		    	thar.gifs1 = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getGifs2:function(){
		var thar = this;
		this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'gifs2'}
		}).
		then((res)=>{
		    if(res.data.code==200){
		    	thar.gifs2 = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getGifs3:function(){
		var thar = this;
		this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'gifs3'}
		}).
		then((res)=>{
		    if(res.data.code==200){
		    	thar.gifs3 = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getGifs4:function(){
		var thar = this;
		this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'gifs4'}
		}).
		then((res)=>{
		    if(res.data.code==200){
		    	thar.gifs4 = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getGifs5:function(){
		var thar = this;
		this.$axios({
		    method:"get",
		    url:thar.url,
		    params:{type:'gifs5'}
		}).
		then((res)=>{
		    if(res.data.code==200){
		    	thar.gifs5 = res.data.data;
			}
		},(err)=>{
		    console.log(err);
		})
	},
	getInfo:function(){
		var thar = this;
		this.$axios({
			method:'get',
			url:process.env.VUE_APP_BASE_URL+'/EMc/MeetingsDetails/'+this.$parent.$data.MeetId,
			headers:{
				'UserGuid':window.localStorage.getItem('UserGuid'),
				'Authorization':'Bearer '+window.localStorage.getItem('Token'),
			},
		}).
		then((res)=>{
			thar.vid = res.data.data[0];
		},(err)=>{
		    console.log(err);
		})
	},
  },
  mounted(){
	this.$refs.check.checked = false;
	setTimeout(function(){
		var player = videojs('videomv', {}, function(){})
		player.play();
	}, 500);
},
  created(){
	this.getInfo();
    this.getPerson();
	this.getGifs1();
	this.getGifs2();
	this.getGifs3();
	this.getGifs4();
	this.getGifs5();
	this.getPhoneCode();
	this.getHaibao();
  }
}
</script>
<style scoped>
#main .cent .player{height: auto;float: left;background: #fff;margin: 0 0.5%;}
#main .cent .player .title{background:#fff;}
#main .cent .player .title .t1{float: left;}
#main .cent .player .title .t2{float: right;}
#main .cent .player .title .t1 img{vertical-align: middle;}
#main .cent .player .title .t1 span{}
#main .cent .player .title .t2 img{vertical-align: sub;}
#main .cent .player .title .t2 span{}
#main .cent .player .acenter{position: relative;}
#main .cent .player #videomv{width: 100%;height:450px;}
#main .cent .player .control{background:#fff;padding:0 20px;}
#main .cent .player .control .left img{vertical-align: middle;cursor: pointer;margin: 0 10px 0 0;width: 25px;}
#main .cent .player .control .left{float: left;}
#main .cent .player .control .right{float: right;}
#main .cent .player .control .right .img{width: 45px;margin: 0 10px;vertical-align: middle;cursor: pointer;}
#main .cent .player .control .right .img:nth-child(2){width: 60px;}
#main .cent .player .control .right .span{margin-right: 10px;font-size: 15px;}
.control input[type="checkbox"] {
  -webkit-appearance: none;
}
.control input[type="checkbox"]:checked + label.label,
.control input[type="checkbox"]:not(:checked) + label.label {
  background-color: #e0e0e0;
  display: inline-block;
  height: 20px;
  width: 50px;
  border-radius: 20px;
  position: relative;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
  vertical-align: middle;
  cursor: pointer;
}
.control  input[type="checkbox"]:checked + label.label:after,
.control  input[type="checkbox"]:not(:checked) + label.label:after {
  background-color: #1aa5ff;
  content: " ";
  height: 20px;
  width: 20px;
  border-radius: 21px;
  position: absolute;
  left: 1px;
  top: 0px;
  -webkit-transition: left 0.4s;
  transition: left 0.4s;
}
.control input[type="checkbox"]:checked + label.label {background-color: #e0e0e0;}
.control input[type="checkbox"]:checked + label.label:after {left: 29px;}
.gift{position: absolute;width: 500px;height: 410px;background: #fff;border-radius: 10px;left: 45%;bottom: 90px;padding:0 10px 10px 10px;opacity: 0.97;}
.gift .giftit{width: 100%;height: 40px;line-height: 40px;text-align: center;overflow-x: scroll;overflow: auto;white-space: nowrap;overflow-y:hidden;}
.gift .giftit span{width: 20%;float: left;cursor: pointer;color: #858585;font-size:16px;}
.gift .giftit span.active{color: #29abe2;}
.gift .pre{float: left;width: 10%;margin-top: 20%;}
.gift .next{float: right;width: 10%;margin-top: 20%;}
.gift .pre img{float: left;cursor: pointer;}
.gift .next img{float: right;cursor: pointer;}
.gift .gifmain{margin: 0 auto;width: 80%;height: auto;}
.gift .gifmain li{width: 32%;height: 150px;float:left;list-style-type: none;cursor: pointer;line-height: 20px;}
.gift .gifmain li.active{border:1px solid #ff0468;height: 150px;border-bottom: none;}
.gift .gifmain li img{width: 100%;height: 90px;}
.gift .gifmain li span{font-size: 14px;width: 100%;line-height: 30px;text-align: center;display: block;}
.gift .gifmain li span em{color: #29abe2;font-style:normal}
.gift .gifmain li span.bak{background:#ff0468;width: 100%;height: 30px;display: block;}
.gift .gifmain li span.bak img{width: 20px;height: auto;vertical-align: middle;margin-top: 5px;}
.gift .gifmain li span.bak img:nth-child(1){float: left;padding-left: 15px;}
.gift .gifmain li span.bak img:nth-child(3){float: right;padding-right: 15px;}
.gift .gifmain li span.bak input{border:none;width: 30px;text-align: center;background:none;outline: none;margin-left: 10px;color: #fff;line-height: 30px;}
.gift .gifmain li:nth-child(4){clear: both;}
.gift .line{height: 10px;clear: both;}
.gift .topline{clear:both;width: 100%;border-top: 3px solid #ccc;}
.gift .topline span{font-size: 20px;}
.gift .topline button{border:none;outline: none;background:#ff0468;color: #fff;padding: 5px 15px;border-radius: 5px;margin-left: 25px;cursor: pointer;}
.sure{background: url(/img/pay.png) no-repeat;position: absolute;background-size: 100%;}
.sure .suremain{position: relative;width: 100%;height: 100%;}
.sure .suremain .close{position: absolute;right: 10px;top: 10px;cursor:pointer;}
.sure .suremain p{color: #fff;text-align: center;font-size: 22px;letter-spacing: 6px;height: 50px;line-height: 50px;}
.sure .suremain ul{padding:0 10px;height: 320px;overflow: auto;margin-top: 20px;}
.sure .suremain ul li{width: 33.33%;text-align: center;background: none;height: auto;float: left;line-height: 50px;position: relative;}
.sure .suremain ul li:hover{background: none;}
.sure .suremain ul li img.head{width: 40px;height: auto;margin:0 auto;display: block;cursor: pointer;}
.sure .suremain ul li span.span{margin-top: -10px;display: block;color: #000;font-size: 12px ! important;margin-right: 0 ! important;white-space: nowrap;}
#check {margin: 20px auto;}
#check .input_check {position: absolute;width: 20px;height: 20px;visibility: hidden;background: #E92333;}
#check span {position: relative;}
#check .input_check+label.label_check {display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -31px -3px;position: absolute;top: 0;right: 28px;}
#check .input_check+label.act{background-position: -2px 0px;}
#check .input_check:checked+label.label_check {background-position: -2px 0px;}
.sure .suremain .total{padding: 0px 40px;margin-top: -10px;height: auto;}
.sure .suremain .total span{width: 50%;}
.sure .suremain .total span:nth-child(1){color: #969696;font-size: 25px;float: left;}
.sure .suremain .total span:nth-child(2){color: #bb0e57;font-size: 35px;float: right;text-align: right;}
.suremain a.close{position: absolute;right: 0;top: 0;width: 60px;height: 60px;}
.way{clear: both;padding:0 10px;width: 92%;}
.way .ways:nth-child(1){width: 45%;float: left;} 
.way .ways:nth-child(2){width: 55%;float: left;} 
.way .ways:nth-child(2) img{margin-left: 30px;}
.way .ways img{vertical-align: middle;margin:0 5px;margin-left: 30px;}
.way .input_check1,.way .input_check2 {position: absolute;width: 15px;height: 15px;visibility: hidden;background: #E92333;}
.way .input_check1+label.label_check1{display: inline-block;background: url('/img/sure1.png') no-repeat;background-position: -40px -3px;position: absolute;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;background-size:100%;}
.way .input_check2+label.label_check2 {display: inline-block;background: url('/img/sure1.png') no-repeat;background-position: -40px -3px;position: absolute;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;background-size:100%;}
.way .input_check1:checked+label.label_check1,.way .input_check2:checked+label.label_check2 {background-position: 0px 0px;}
.way .ways span{color: #4a4a4a;font-size: 14px;}
.way .ways a{color: #fff;background: #00aaee;font-size: 12px;padding: 0px 7px;border-radius: 10px;text-align: right;margin-left: 5px;}
.way .label_check2.act{background-position: 0px 0px ! important;}

.ofsure{clear:both;height: 40px;}
.ofsure button{clear:both;background: #08baff;color: #fff;border:none;outline: none;border-radius: 5px;margin: 0 auto;display: block;cursor: pointer;}
.share{background: url(/img/haibao.png) no-repeat;position: absolute;left: 0;background-size: 100%;}
.sharecontent{position: relative;width: 100%;height: 100%;z-index: 1;}
.abs{position: absolute;}
.sharecontent span{color: #fff;}
.sharecontent .link a{color: #239fff;}
.sharecontent .close{top: 5px;right: 5px;cursor: pointer;}
.phone{background: url(/img/sharem.png) no-repeat;position: absolute;background-size: 100%;}
.phonecontent{position: relative;width: 100%;height: 100%;z-index: 1;}
.phone .close{top: 0px;right: 0px;cursor: pointer;z-index: 1;width: 20px;}
.phone .code{width: 70px;border-radius: 10px;}
.phonecontent:before{content: "";position: absolute;width: 0;height: 0;border: 15px solid transparent;border-top-color: #0076d0;left: 50%;margin-left: -12px;bottom: -30px;}
.proms{position: absolute;background: url(/img/hudong.png) no-repeat;background-size: 100%;}
.proms p{width: 100%;text-align: center;color: #fff;height: 65px;}
.proms .form input{height: 40px;line-height: 40px;border:none;border-bottom: 1px solid #9fe3ff;outline: none;}
.proms .form textarea{margin-top:20px;height: 60px;line-height: 40px;border:none;border-bottom: 1px solid #9fe3ff;outline: none;}
.proms button{clear:both;background:#08baff;height: 40px;line-height: 40px;color: #fff;text-align: center;border:none;margin: 0 auto;width: 70%;border-radius: 5px;margin-top: 35px;display: block;cursor: pointer;}
.proms a{position: absolute;right: 0;top: 0;width: 70px;height: 70px;}
.fenxiang{width: 80px;height: 40px;top: 25px;right: 10px;}
.baberrage-stage {position: absolute;width: 100%;height: 180px;overflow: hidden;top: 0;font-size: 15px;}
</style>
