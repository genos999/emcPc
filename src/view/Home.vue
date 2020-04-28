<template>
	<div id="main">
		<div class="logo">
			<img src="img/logo.png">
		</div>
		<div class="cent">
			<Ranking :MeetId=MeetId></Ranking>
			<Video :MeetId=MeetId></Video>
			<div class="chat">
				<div class="ad swiper">
					<template>
					  <swiper ref="mySwiper" :options="swiperOptions">
					    <swiper-slide><img src="img/m_ban.png"></swiper-slide>
					    <swiper-slide><img src="img/m_ban.png"></swiper-slide>
					    <swiper-slide><img src="img/m_ban.png"></swiper-slide>
					    <swiper-slide><img src="img/m_ban.png"></swiper-slide>
					    <swiper-slide><img src="img/m_ban.png"></swiper-slide>
					    <div class="swiper-pagination" slot="pagination"></div>
					  </swiper>
					</template>
				</div>
				<div class="im" id="mesglist" v-if="code" >
					<div v-for="item in message" :class="item.flow=='in'?'left':'right'" v-cloak>
						<div class="le"><img :src="item.avatar?item.avatar:'img/icon.png'" v-cloak></div>
						<div class="ri">
							<span v-text="item.nick?item.nick:'Guest'" style="display: block;" v-cloak></span>
							<span v-if="item.payload[0].name=='text'" class="content" v-text="item.payload[0].text" v-cloak></span>
							<span class="content" v-if="item.payload[0].name=='img'" v-cloak><img :src="item.payload[0].src" v-cloak></span>
							<span class="content" v-if="item.payload[0].name=='image'" style="display: flex;" v-cloak><img :src="item.payload[0].text" v-cloak></span>
						</div>
					</div>
				</div>
				<div class="im" v-else>
					<div class="iflogin" >
						<span>请登录</span>
					</div>
				</div>
				<div class="con">
					<input type="text" class="input" v-model="text">
					<div class="mile">
						<!-- <img src="img/mile.png" @click="doemot"> -->
						<img src="img/mile.png" @click="handleSendImageClick">
						<img src="img/wx.png" @click="getLogin" v-if="!code">
						<div class="fullscr" v-if="bindWechatShow"></div>
						<div class="login-qr" v-if="bindWechatShow">
							<wxlogin :appid="appid" :scope="scope" :theme='style' :state='state' :redirect_uri="redirect_uri"></wxlogin>
						</div>
						<button @click="adddanmu">发送</button>
					</div>
					<div class="emot" v-if="emot" v-cloak>
						<li v-for="em in emojiName">
							<img :src="emojiUrl + emojiMap[em]" @click="sendemot(em)">
						</li>
					</div>
					<input type="file" id="imagePicker" ref="imagePicker" accept=".jpg, .jpeg, .png, .gif" @change="sendImage" style="display:none"/>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Ranking from '../components/Ranking';
import Video from '../components/Video';
import Footer from '../components/Footer';
import '../assets/scss/style.css';
import wxlogin from 'vue-wxlogin'
import 'vue2-toastr/dist/css/vue2-toastr.css'
import TIM from 'tim-js-sdk'
import COS from "cos-js-sdk-v5";
import { emojiMap, emojiName, emojiUrl } from '../emoji'
let options = {
  SDKAppID: 1400326220
};
let tim = TIM.create(options);
tim.setLogLevel(1);
tim.registerPlugin({'cos-js-sdk': COS});
export default {
	components:{
		wxlogin,
		Ranking,
		Video,
		Footer,
	},
	data(){
	  	return{
	        appid:'wx837a73270512d0e3',
	        AppSecret:'a049a673cbbdcbe73211bffee1d501a0',
	        redirect_uri:encodeURIComponent('http://emcapi.e-lab.cn/'),
	        scope:'snsapi_login',
	        style:'black',
	        state:'11',
	        bindWechatShow:false,
	  		UserGuid:'',
	  		Token:'',
	  		postmer:false,
			person:[],
			message:[],
			emot:false,
			playshow:0,
			text:'',
			currentId : 0,
			url:'http://emcapi.e-lab.cn/data.php',
			swiperOptions: {
				loop:true,
				autoplay:{
					delay:3000,
					disableOnInteraction:false
				},
				speed:1000,
	          	pagination: {
	            	el: '.swiper-pagination'
	          	},
	        },
	        code:'',
	        userInfo:[],
	        MeetId:'',
	        userID:'',
	        userSig:'o1a-pw0PWKfOhKxtxzHozYqSGPmI:eJwtjdEKgjAYhd9lt5X8WzqX0J2kaZCyoLxUNmuIOk1Kjd49MS-Pdz7O*aDLiRsv2SIHEQPQes5KyKpTuZpxjdONfkN0DfPzI*y7fvTrMWm4F5XHxX*KItVaCeRgE2BLKCHwb2SvVSuRQ8FksLBOlRPBFmNALWyZy4a6T2cZZDFpLoGIV3Z1C-AQuMRjfsqT1lbFrhgy2*UxzaNDvUffHzDpOFc_',//临时秘钥
	        emojiMap: emojiMap,
		    emojiName: emojiName,
		    emojiUrl: emojiUrl,
		    groupId:'@TGS#2EQX7LLGE'
		}
	},
	methods:{
		login:function(){
			var thar = this;
			var o = {
				'userGuId' : 'so json 在线工具',
				'identId' : 80,
				'UserPhone' : '13611869987',
				'NickName' : 's三台',
				'Avatar' : 'www.baidu.com',
				'Score' : 0,
				'AccountBalance' : 33,
				'GroupId' : '111',
				'UserName' : '13588889999',
				'UserRank' : '',
			};
			this.$axios({
				method:'post',
				url:process.env.VUE_APP_BASE_URL+'/EMcLogin/Login',
				data:o,
			}).
			then((res)=>{
				res = res.data;
				thar.UserGuid = res.data.userGuId;
	  			thar.Token = res.token;
	  			window.localStorage.setItem('UserGuid', res.data.userGuId);
	  			window.localStorage.setItem('Token', res.token);
	  			
			},(err)=>{
			    console.log(err);
			})
		},
		getAccessToken:function(){
			var thar = this;
			var urls = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+thar.appid+'&secret='+thar.AppSecret+'&code='+thar.code+'&grant_type=authorization_code';
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'code',url:urls}
			}).
			then((res)=>{
				if(res.data.code==200){
					thar.userInfo = res.data.data;
					this.getSign();
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getSign:function(){
			var thar = this;
			var o = {
				OpenId:thar.userInfo.openid,
				NickName:thar.userInfo.nickname,
				HeadImgUrl:thar.userInfo.headimgurl,
			};
			this.$axios({
			    method:"post",
			    url:'http://productelab.e-lab.cn/app/server/user/wxsign',
			    data:o
			}).
			then((res)=>{
				if(res.data.statusCode=='000000'){
					// thar.userSig = res.data.data.userSign;//获取正式秘钥
					this.loginTim();
				}
			},(err)=>{
			    console.log(err);
			})
		},
		loginTim:function(){
			var thar = this;
			let promise = tim.login({userID: thar.userInfo.openid, userSig: thar.userSig});
			promise.then(function(imResponse) {
				thar.setMyProfile();
			  	thar.getHisMsg();
			  	thar.getMyProfile();
			  	console.log(imResponse);
			}).catch(function(imError) {
			  console.warn('login error:', imError);
			});
		},
		setMyProfile:function(){
			var thar = this;
			let sex;
			if(thar.userInfo.sex==1){
				sex = TIM.TYPES.GENDER_MALE;
			}else{
				sex = TIM.TYPES.GENDER_FEMALE;
			}
			let onSdkReady = function(event) {
			  	let promise = tim.updateMyProfile({
				  nick: thar.userInfo.nickname,
				  avatar: thar.userInfo.headimgurl,
				  gender: sex,
				  selfSignature: '',
				  allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
				});
				promise.then(function(imResponse) {
				  
				}).catch(function(imError) {
				  console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
			};
			tim.on(TIM.EVENT.SDK_READY, onSdkReady);
		},
		getMyProfile:function(){
			var thar = this;
			let onSdkReady = function(event) {
				let promise = tim.getMyProfile();
				promise.then(function(imResponse) {
				  
				}).catch(function(imError) {
				  console.warn('getMyProfile error:', imError); // 获取个人资料失败的相关信息
				});
			}
			tim.on(TIM.EVENT.SDK_READY, onSdkReady);
		},
		getLogin:function(){
			var thar = this;
			thar.bindWechatShow = true;
		},
		getMsg:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'msg'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.msg = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		sendemot:function(em){
			var thar = this;
			var ars = [];
			ars['text'] = em;
			let con = thar.$utils.decodeText(ars);
			if(con.name=='text'){
				thar.text = con.text;
			}else{
				thar.text = con.src;
			}
			let message = tim.createTextMessage({
			  to: thar.groupId,
			  conversationType: TIM.TYPES.CONV_GROUP,
			  payload: {
			    text: em
			  }
			});
			let promise = tim.sendMessage(message);
			promise.then(function(imResponse) {
			  // 发送成功
			  let res = imResponse.data.message;
			  let rey = [];
			  rey['avatar'] = thar.userInfo.headimgurl;
			  rey['nick'] = thar.userInfo.nickname;
			  rey['payload'] = thar.$utils.decodeText(res.payload);
			  thar.message.push(rey);
			  thar.text="";
			}).catch(function(imError) {
			  // 发送失败
			  console.warn('sendMessage error:', imError);
			});
			if(thar.emot){
				thar.emot = false;
			}else{
				thar.emot = true;
			}
			thar.zan = false;
			thar.proms = false;
		},
		doemot:function(){
			var thar = this;
			if(thar.emot){
				thar.emot = false;
			}else{
				thar.emot = true;
			}
			thar.zan = false;
			thar.proms = false;
		},
		adddanmu:function(){
			var thar = this;
			// var num = parseInt(Math.random()*10);
			// thar.barrageList.push({
			// 	id: num,
			// 	avatar: thar.userInfo.headimgurl,
			// 	msg: thar.text,
			// 	time: num
			// });
			let message = tim.createTextMessage({
			  to: thar.groupId,
			  conversationType: TIM.TYPES.CONV_GROUP,
			  payload: {
			    text: thar.text
			  }
			});
			let promise = tim.sendMessage(message);
			promise.then(function(imResponse) {
			  // 发送成功
			  let res = imResponse.data.message;
			  let rey = [];
			  rey['avatar'] = thar.userInfo.headimgurl;
			  rey['nick'] = thar.userInfo.nickname;
			  rey['payload'] = thar.$utils.decodeText(res.payload);
			  thar.message.push(rey);
			  thar.text="";
			}).catch(function(imError) {
			  // 发送失败
			  console.warn('sendMessage error:', imError);
			});
		},
		getHisMsg:function(){
			var thar = this;
			let onSdkReady = function(event) {
			  let promise = tim.getMessageList({conversationID: 'GROUP'+thar.groupId, count: 15});
				promise.then(function(imResponse) {
				  const messageList = imResponse.data.messageList; // 消息列表。
				  const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				  const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				  let arr = [];
				  for(var k in messageList){
				  	arr.push(messageList[k]);
				  }
				  for(var i=0;i<arr.length;i++){
				  	if(arr[i]['payload']['uuid']){
				  		arr[i]['payload']['text'] = arr[i]['payload']['imageInfoArray'][0]['imageUrl'];
				  	}
				  }
				  for(var i=0;i<arr.length;i++){
				  	arr[i]['payload'] = thar.$utils.decodeText(arr[i]['payload']);
				  }
				  thar.message = arr;
				});
			};
			tim.on(TIM.EVENT.SDK_READY, onSdkReady);
			thar.getMessage();
		},
		getMessage:function(){
			var thar = this;
			let onMessageReceived = function(event) {
				let res = event.data[0];
				console.log(res);
				if(res['payload']['uuid']){
			  		res['payload']['text'] = res['payload']['imageInfoArray'][0]['imageUrl'];
			  	}
			  	res['payload'] = thar.$utils.decodeText(res['payload']);
			  	thar.message.push(res);
			};
			tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
		},
		handleSendImageClick:function(){
			if(this.code){
				this.$refs.imagePicker.click();
			}else{
				alert("请登录");
			}
		},
		sendImage:function(){
			var thar = this;
		    let message = tim.createImageMessage({
		        to: thar.groupId,
		        conversationType: TIM.TYPES.CONV_GROUP,
		        payload: {
		          file: document.getElementById('imagePicker')
		        },
		        onProgress: function(event) {
		        	console.log('file uploading:', event) 
		        }
		    })
	      	let promise = tim.sendMessage(message);
			promise.then(function(imResponse) {
			  console.log(imResponse);
			  let res = imResponse.data.message;
			  let rey = [];
			  res['payload']['text'] = res['payload']['imageInfoArray'][0]['imageUrl'];
			  res['payload'] = thar.$utils.decodeText(res['payload']);
			  rey['avatar'] = thar.userInfo.headimgurl;
			  rey['nick'] = thar.userInfo.nickname;
			  rey['payload'] = res['payload'];
			  thar.message.push(rey);
			}).catch(function(imError) {
			  console.warn('sendMessage error:', imError);
			});
	    },
	},
	mounted(){
      	this.swiper.slideTo(3, 1000, false)
      	if(this.$utils.getUrlKey("code")){
      		this.code = this.$utils.getUrlKey("code");
      		this.getAccessToken();
      	}
	},
	created(){
		this.MeetId = this.$utils.getUrlKey("MeetId") || '4733412023323097580';
		this.login();
		this.getMsg();
	},
	computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    updated(){
    	let ele = document.getElementById('mesglist');
    	ele.scrollTop = ele.scrollHeight;
    }
}
</script>
<style scoped>
	*{padding:0;margin:0;margin: 0 auto;color: #4a4a4a;}
	[v-cloak]{display: none ! important;}
	ul li{list-style-type: none;}
	#main{background:url(/img/bg.png) no-repeat #dfebf1;background-size:100%;height: auto;}
	#main .logo img{width: 575px;margin: 0 auto;display: block;padding-top: 80px;}
	#main .cent{width: 97%;margin: 0 auto;margin-top: 80px;display: flex;justify-content: space-around;}
	#main .cent .chat{float: left;height: auto;background: #fff;}
	.chat .ad{width: 100%;}
	.chat .im{overflow: auto;}
	.chat .im .left{clear: both;margin-bottom: 5px;height: auto;display: flow-root;}
	.chat .im .right{clear: both;margin-bottom: 5px;height: auto;display: flow-root;float: right}
	.chat .im .left img{width: 26px;float: left;margin-right: 20px;}
	.chat .im .right img{width: 26px;float: left;margin-left: 10px;}
	.chat .im .left .gf{margin-left: 10px;background: #29abe2;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .left .ms{margin-left: 10px;background: #ea68a2;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .left .ding{margin-left: 7px;background: #f8b551;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .left .content{display: block;background: #f1f1f1;padding: 10px 10px;margin: 15px 0;border-radius: 23px 20px 20px 0;width: 95%;}
	.chat .im .right .gf{margin-right: 10px;background: #29abe2;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .right .ms{margin-left: 10px;background: #ea68a2;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .right .zj{margin-left: 10px;background: #22ac38;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .right .ding{margin-left: 7px;background: #f8b551;color: #fff;padding: 2px 8px;border-radius: 9px;}
	.chat .im .right .content{width:65%;display: block;background: #f1f1f1;padding: 10px 10px;margin: 15px 0;border-radius: 23px 20px 20px 0;text-align: left;float: right;}
	.chat .im .left .le{float: left;}
	.chat .im .right .le{float: right;}
	.chat .im .left .ri{float: left;}
	.chat .im .right .ri{text-align: right;display: table-row;}
	.chat .con{height: 75px;margin-top: 10px;position: relative;}
	.chat .con .input{height: 30px;border:1px solid #ccc;margin: 0 auto;display: block;width: 90%;outline: none;}
	.chat .con .mile{margin-top: 10px;}
	.chat .con .mile img{margin-left: 15px;width: 29px;cursor: pointer;}
	.chat .con .mile button{margin-right: 15px;color: #fff;background: #6d6d6d;float: right;border:none;outline: none;padding: 4px 17px;cursor: pointer;}
	::-webkit-scrollbar {width: 6px;height: 4px;background-color: #F5F5F5;}
	::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);background: #fff;}
	::-webkit-scrollbar-thumb {border-radius: 3px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);background-color: #3D4B4E;}
	::-webkit-scrollbar-thumb:hover {border-radius: 3px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);background-color: #3D4B4E;}
	.blue {border-radius: 100px;background: #e6ff75;color: #fff;}
	.green {border-radius: 100px;background: #75ffcd;color: #fff;}
	.red {border-radius: 100px;background: #e68fba;color: #fff;}
	.yellow {border-radius: 100px;background: #dfc795;color: #fff;}
	.emot{position: absolute;width: 485px;height: auto;background: #e0e0e0;left: -160px;bottom: 40px;border-radius: 10px;}
	.emot li{width: 78px;height: 70px;float:left;list-style-type: none;position: relative;cursor: pointer;overflow: hidden;}
	.emot li img{width: 100%;cursor: pointer;}
	.emot li img:hover{background: #b5b5b5;border-radius: 10px;}
	.postmer{position: absolute;background: #292b38;width: 230px;height: 140px;top: -160px;left: 90px;border-radius: 15px;}
	.postmer:before{content: "";position: absolute;width: 0;height: 0;border: 15px solid transparent;border-top-color: #292b38;left: 50%;margin-left: -12px;bottom: -30px;}
	.postmer .imgleft{width: 50%;float: left;}
	.postmer .imgleft img{margin-top: 30%;width: 100px;}
	.postmer .imgright{width: 45%;float: left;padding:10px 5px 0 0;}
	.postmer .imgright span{display: block;height: 30px;line-height: 30px;}
	.postmer .imgright span:nth-child(1){color: #fff;font-size: 15px;}
	.postmer .imgright span:nth-child(2){color: #ffea02;font-size: 14px;}
	.postmer .imgright span:nth-child(3){color: #fff;font-size: 13px;}
	.postmer .imgright span:nth-child(4){color: #ffea02;font-size: 14px;}
	.postmer .imgright img{cursor: pointer;}
	.postmer .imgright img:nth-child(1){margin-left: 5px;}
	.postmer .imgright input{width: 15px;margin:0 5px;border:none;outline: none;background: none;color: #fff;text-align: center;}
	.postmer .imgright span button{border:none;background: #211931;color: #fff;padding: 3px 10px;border-radius: 5px;float: right;margin-top: 4px;outline: none;cursor: pointer;}
	.swiper img{width: 100%;}
	.login-qr{position: fixed;top: 50%;left: 50%;margin-top: -200px;margin-left: -200px;width: 400px;height: 400px;background: #ccc;z-index: 2;}
	.fullscr{position: fixed;width:100%;height: 100%;left: 0;top: 0;background: #000;opacity: 0.7;z-index: 1;}
	.iflogin{width: 100%;height: 100%;background: #000;opacity: 0.5;z-index: 1;text-align: center;}
	.iflogin span{color: #fff;z-index: 2;}
	.content img {max-width: 100px ! important;width: 100% ! important;}
</style>