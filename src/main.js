import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import baseUrl from "./utils/api";
import storage from "vue-ls";

let options = {
  namespace:'vuejs__',
  name:'ls',
  storage:'local'
}

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(storage,options)
Vue.prototype.hrefUrl = baseUrl.weChatLogin;
Vue.prototype.hrefUrl2 = baseUrl.faceNucleus;
router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
