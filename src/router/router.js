import Vue from 'vue';
import Router from 'vue-router';
import index from '../html/index/index';
import product from '../html/product/product';
import my from '../html/my/my';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        headText: 'index',
        leftShow: false
      }
    },
    {
      path: '/product',
      name: 'product',
      component: product,
      meta: {
        headText: 'product',
        leftShow: false
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        headText: 'my',
        leftShow: false
      }
    }
  ]
})
