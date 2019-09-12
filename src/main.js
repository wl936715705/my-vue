// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import qs from 'qs'
import axios from 'axios'
import router from './router'
import Jmweb from './libs/jmweb'

// Vue.prototype.$axios = axios;
Vue.prototype.$jmweb = new Jmweb({
  request: {
    baseUrl: 'http://172.17.0.31:9604/',
    dependQs: qs,
    dependAxios: axios
  }
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
