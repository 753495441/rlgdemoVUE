<template>
  <div>
    <van-nav-bar>
      <van-icon name="setting-o" slot="right" @click="ClickSet" size="23px">
      </van-icon>
    </van-nav-bar>
    <van-grid :border="false" :column-num="1" class="usertop">
      <van-row>
        <van-col span="12"><van-icon name="manager-o" size="50" class="user" /></van-col>
        <van-col span="12" class="login"  @click="tzLogin" v-if="users == ''">登录/注册</van-col>
        <van-col span="12" class="loginuser" @click="ClickSet" v-if="users !='' " style="font-size: larger">{{users.username}}</van-col>
      </van-row>
    </van-grid>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link @click="tzOrder" />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link @click="tzFree" />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  import store from '@/store';

  export default {
    name: 'User',
    store,
    data(){
      return{
        users:'',
      }
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    methods: {
      tzFree() {
        this.$router.push("/free")
      },
      ClickSet() {
        this.$router.push("/userset")
      },
      tzOrder() {
        this.$router.push("/order")
      },
      tzLogin() {
        this.$router.push("/login");
      },
      getUser() {
        //保存当前对象
        var this_ = this;
        this_.users = store.state.users;
      },
    },
    activated:function () {
      this.getUser();
    }
  };
</script>

<style scoped>
  .user-poster {
     width: 100%;
     height: 53vw;
     display: block;
   }
  .user-group {
     margin-bottom: 15px;
   }
  .user-links {
     padding: 15px 0;
     font-size: 12px;
     text-align: center;
     background-color: #fff;
  }
  .user{
    padding-top: 20px;
    padding-left: 50px;
    height: 100%;
    width: 50px;
  }
  .loginuser{
    padding-top: 35px;
    padding-left: 40px;
  }
  .login{
    padding-top: 35px;
    padding-left: 20px;
  }
</style>
