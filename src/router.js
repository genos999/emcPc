/*
* @Author: Qiu Jie
* @Date:   2020-04-06 12:43:15
* @Last Modified by:   Qiu Jie
* @Last Modified time: 2020-04-06 19:39:21
*/

import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Home from './view/Home'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home }
  ]
})