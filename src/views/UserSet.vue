<template>
<div class="userset">
  <top-back :content="title"></top-back>

  <van-grid :border="false" :column-num="1" class="usertop">
    <van-row>
      <van-col span="12"><van-icon name="manager-o" size="50" class="user" /></van-col>
      <van-col span="12" class="login"  @click="tzLogin" v-if="users == ''">登录/注册</van-col>
      <van-col span="12" class="loginuser" v-if="users != ''" style="font-size: larger">{{users.username}}</van-col>
    </van-row>
  </van-grid>

  <van-grid :column-num="1">
    <van-grid-item text="地址管理" @click="setAddress"/>
    <van-grid-item text="账户与安全"/>
    <van-grid-item text="支付设置"/>
    <van-grid-item text="功能反馈"/>
    <van-grid-item text="关于我们"/>
  </van-grid>

  <van-cell-group>
    <van-cell />
  </van-cell-group>

  <van-grid :column-num="1">
    <van-grid-item text="退出登录" @click="exitlogin"/>
  </van-grid>
</div>
</template>

<script>
import store from '@/store';
import TopBack from '@/components/TopBack.vue';

  export default {
    name: 'UserSet',
    components:{
      TopBack
    },
    store,
    data(){
      return{
        users:'',
        title:'设置'
      }
    },
    methods: {
      setAddress(){
        this.$router.push("/setaddress");
      },
      tzLogin(){
        this.$router.push("/login");
      },
      exitlogin(){
        var this_ = this;
        store.commit('exit');
        this_.users=null;
        this.$router.push("/user");
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
  .text{
    padding-top: 30px;
    padding-left: 10px;
  }
  .usertop{
    height: 100px;
    width: 100%;
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
