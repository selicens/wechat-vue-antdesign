import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import baseUrl from "./utils/api";

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios = axios;
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
