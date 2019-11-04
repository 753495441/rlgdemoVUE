<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/category">category</router-link>-->
    <!--</div>-->
    <keep-alive>
      <router-view/>
    </keep-alive>

    <van-tabbar
      route
      v-model="active"
    >
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="category" icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item name="user" icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data(){
      return{
        active:'home',
      }
    },
    methods:{

    }
  };
</script>

<style lang="scss">

</style>
