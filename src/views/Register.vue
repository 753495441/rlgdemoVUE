<template>
    <div class="register">
      <top-back :content="title"></top-back>

      <van-cell-group>
        <van-cell size="large" value="" />
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="username"
          autofocus="autofocus"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入用户名')"
          @blur="unBlur"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />

        <van-field
          v-model="password2"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          required
        />

        <van-field
          v-model="question"
          required
          label="密保问题"
          placeholder="请输入问题"
        />

        <van-field
          v-model="answer"
          required
          label="密保答案"
          placeholder="请输入问题答案"
        />
      </van-cell-group>

      <van-button type="primary" size="large" @click="ToRegister">注册</van-button>
    </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import TopBack from '@/components/TopBack.vue';

  export default {
    name: 'Register',
    components:{
      TopBack
    },
    data(){
      return{
        username:'',
        password:'',
        password2:'',
        question:'',
        answer:'',
        title:'新用户注册',
      }
    },
    methods: {
      ToRegister() {
        if(this.password!=''&&this.password2!=''){
          if(this.password==this.password2){
            if(this.question!=''&&this.answer!=''){
              var this_ = this;
              //封装前端传递给后端的数据
              var params = new URLSearchParams();
              params.append('username', this.username);
              params.append('password', this.password);
              params.append('question', this.question);
              params.append('answer', this.answer);
              //执行请求获取后端数据
              axios.post('/portal/user/register.do', params)
                .then(function (datas) {
                  var status = datas.data.status
                  if(status!=0){
                    Toast.fail(datas.data.msg);
                  }else {
                    this_.$dialog.alert({
                      message:datas.data.msg
                    });
                    //重置数据
                    this_.username='';
                    this_.password='';
                    this_.question='';
                    this_.answer='';
                    this_.password2='';
                    //也可以让用户跳转回登陆页面
                    this_.$router.push("/login");
                  }
                })
            }else{
              Toast.fail('密保问题答案不能为空');
            }
          }else{
            Toast.fail('两次输入的密码必须相同');
          }
        }else{
          Toast.fail('密码不能为空');
        }

        //3.判断两次输入的密码是否一样
        //4.密保问题和答案内容不能为空
      },
      unBlur(){
        //当用户输入用户名之后，鼠标焦点移开
        //1.判断当前注册的用户名是否存在
        //2.如果用户名存在就对用户提示，然后焦点重新定位到用户名输入框，并清空
        //保存当前对象
        var this_ = this;
        //封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('str', this.username);
        params.append('type', 'username');
        //执行请求获取后端数据
        axios.post('/portal/user/check_valid.do', params)
          .then(function (datas) {

            var status = datas.data.status
            if(status!=0){
              Toast.fail(datas.data.msg);
            }else {
              Toast.success(datas.data.msg)
            }
          })
        //3.判断两次输入的密码是否一样
        //4.密保问题和答案内容不能为空
      }
    }
  };
</script>

<style scoped>

</style>
