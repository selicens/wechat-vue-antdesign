import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from "@/views/Authentication"
import Businesslicense from "@/views/Businesslicense"
import Link from "@/views/Link";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'登录'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication,
    meta:{
      title:'认证'
    }
  },
  {
    path: '/businesslicense',
    name: 'Businesslicense',
    component: Businesslicense,
    meta:{
      title:'营业执照认证'
    }
  },
  {
    path: '/link',
    name: 'Link',
    component: Link,
    meta:{
      title:'下载'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
