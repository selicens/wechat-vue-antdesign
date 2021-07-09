import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios = axios;
Vue.prototype.api = "http://cm.voiper.cn/boot/faceid/"
Vue.prototype.hrefUrl = 'http://cm.voiper.cn/boot/faceid/render/wechat_mp/'
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
