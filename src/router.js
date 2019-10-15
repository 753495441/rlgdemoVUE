import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Cart from './views/Cart.vue';
import Free from './views/Free.vue';
import UserSet from './views/UserSet.vue';
import SetAddress from './views/SetAddress.vue';
import AddAddress from './views/AddAddress.vue';
import Order from './views/Order.vue';
import Evaluation from './views/Evaluation.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/free',
      name: 'free',
      component: Free,
    },
    {
      path: '/userset',
      name: 'userset',
      component: UserSet,
    },
    {
      path: '/setaddress',
      name: 'setaddress',
      component: SetAddress,
    },
    {
      path: '/addaddress',
      name: 'addaddress',
      component: AddAddress,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: Evaluation,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ForgetPassword.vue'),
    },
    {
      path: '/goods',
      name: 'goods',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Goods.vue'),
    },
    {
      path: '/category',
      name: 'category',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Category.vue'),
    },
  ],
});
