import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import store from './store/index'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(BootstrapVue);
Vue.use(MavonEditor);
// 将axios添加到vue原型就不需要在每个页面引入
Vue.prototype.$axios = axios;
Vue.use(router);
Vue.use(store);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
