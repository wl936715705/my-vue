// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import qs from 'qs';
import axios from 'axios';
import router from './router/router';
import Jmweb from '../src/assets/js/jmweb';

import { Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';

Vue.use(Tabbar).use(TabbarItem);

let baseURL = '';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://172.17.0.249:10086';
} else {
  baseURL = 'http://172.17.0.249:10086';
}
Vue.prototype.$jmweb = new Jmweb({
  request: {
    baseUrl: baseURL,
    dependQs: qs,
    dependAxios: axios,
    timeout: 60000
  }
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
