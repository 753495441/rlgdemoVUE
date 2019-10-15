<template>
    <div class="login">
      <van-nav-bar
        title="用户登录"
        left-text="返回"
        right-text="注册新用户"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <van-cell-group>
        <van-cell size="large" value="" />
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入用户名')"
        />

        <van-row>
          <van-col span="18">
            <van-field
              v-model="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
            />
          </van-col>
          <van-col span="6">
            <van-button type="default" size="large" to="/forgetpassword">忘记密码</van-button>
          </van-col>
        </van-row>

      </van-cell-group>

      <van-button type="primary" size="large" @click="ToLogin">登录</van-button>

      <van-cell-group>
        <van-cell />
      </van-cell-group>

      <van-divider>使用其它方法登录</van-divider>

      <van-image
        round
        width="3rem"
        height="3rem"
        :src="qq"
        class="icon"
      />
      <van-image
        round
        width="3rem"
        height="3rem"
        :src="wechat"
        class="icon"
      />

    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
import qq from '@/assets/QQ.png';
import wechat from '@/assets/wechat.png';

  export default {
    name: 'Login',
    store,
    data(){
      return{
        username:'',
        password:'',
        datauser: '',
        qq:qq,
        wechat:wechat
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);//返回上一层
      },
      onClickRight(){
        this.$router.push("/register");
      },
      ToLogin() {
        //保存当前对象
        var this_ = this;
        //封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password', this.password);
        //执行请求获取后端数据
        axios.post('/portal/user/login.do', params)
          .then(function (datas) {

            var status = datas.data.status
            if(status!=0){
              Toast.fail(datas.data.msg);
            }else{
              //全局保存当前登录用户信息
              store.state.users = datas.data.data;
              //获取后台数据
              this_.datauser=datas.data.data
              this_.$router.push({
                path:'/user',
                query:{da:this_.datauser}
              });
            }
          })
      }
    }
  };
</script>

<style scoped>
.icon{
  padding-left: 20px;
  padding-right: 20px;
}
</style>
