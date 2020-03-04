import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

// import env from './env'

// 根据前端的跨域方式左调整
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5e37a196850d6729505a1070/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if(res.status == 0) {
    return res.data;
  } else if(res.status == 10){
    if(path == '#/login'){
      return Promise.reject(res);
    }
    if(path != '/#/index') {
      window.location.href = '/#/login'
      Message.warning('请先登陆~'); 
      return Promise.reject(res);
    }
  } else {
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(vueAxios,axios);
Vue.use(VueCookie);
Vue.component(Message.name, Message);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
// 生产环境的提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
