import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from "../views/Authentication";
import Businesslicense from "../views/Businesslicense";
import Link from "../views/Link";
import Share from "../components/Share";
Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    redirect:'/home'
  },*/
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'实名信息采集'
    }
  },
  {
      path: '/authentication',
    name: 'Authentication',
    component: Authentication,
    meta:{
      title:'实名信息采集'
    }
  },
  {
    path: '/businesslicense',
    name: 'Businesslicense',
    component: Businesslicense,
    meta:{
      title:'实名信息采集'
    }
  },
  {
    path: '/link',
    name: 'Link',
    component: Link,
    meta:{
      title:'实名信息采集'
    }
  },
  {
    path: '/share/:id',
    name: 'Share',
    component: Share,
    meta:{
      title:'实名信息采集'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
