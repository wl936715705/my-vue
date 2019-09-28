import Vue from 'vue';
import Router from 'vue-router';
import index from '../html/index/index';
import product from '../html/product/product';
import productDetail from '../html/product/productDetail';
import my from '../html/my/my';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta: {
        title: '首页',
        footShow: true
      }
    },
    {
      path: '/product',
      component: product,
      meta: {
        title: '产品',
        footShow: true
      }
    },
    {
      path: '/my',
      component: my,
      meta: {
        title: '我的',
        footShow: true
      }
    },
    {
      path: '/productDetail',
      component: productDetail,
      meta: {
        title: '产品详情',
        leftShow: true
      }
    }
  ]
})
