import Vue from 'vue';
import Router from 'vue-router';
import index from '../html/index';
import product from '../html/product';
import my from '../html/my';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
