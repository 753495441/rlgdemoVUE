<template>
    <div class="fogetpassword">
      <top-back :content="title"></top-back>

      <van-cell-group>
        <van-cell size="large" value="" />
      </van-cell-group>

      <div  v-if="question==''&&forgetToken==''">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"

        />
      </van-cell-group>


      <van-cell-group>
        <van-cell />
      </van-cell-group>

      <van-button  type="primary" size="large" color="red" round @click="Forget">下一步</van-button>
      </div>

      <div  v-if="question!=''">
        <van-row>
          <van-col span="4">问题：</van-col>
          <van-col span="20">{{question}}</van-col>
        </van-row>

        <van-cell-group>
          <van-field
            v-model="answer"
            required
            clearable
            label="答案："
            placeholder="请输入问题答案"

          />
        </van-cell-group>

        <van-cell-group>
          <van-cell />
        </van-cell-group>

        <van-button  type="primary" size="large" color="red" round @click="GetAnswer">提交</van-button>
      </div>

      <div  v-if="forgetToken!=''">
        <van-cell-group>
          <van-field
            v-model="passwordNew"
            type="password"
            required
            clearable
            label="新密码："
            placeholder="请输入新密码"
          />
          <van-field
            v-model="password2"
            type="password"
            label="确认密码"
            placeholder="请再次输入新密码"
            required
          />
        </van-cell-group>

        <van-cell-group>
          <van-cell />
        </van-cell-group>

        <van-button  type="primary" size="large" color="red" round @click="GetPasswordNew">提交</van-button>
      </div>

    </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import TopBack from '@/components/TopBack.vue';

  export default {
    name: 'ForgetPassword',
    components:{
      TopBack
    },
    data(){
      return{
        username:'',
        question:'',
        answer:'',
        forgetToken:'',
        passwordNew:'',
        password2:'',
        title:'忘记密码',
      }
    },
    methods: {
      Forget() {
        //保存当前对象
        var this_ = this;
        //封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('username', this.username);
        axios.post('/portal/user/forget_get_question.do', params)
          .then(function (datas) {
            var status = datas.data.status
            console.log(datas)
            if(status!=0){
              Toast.fail(datas.data.msg);
            }else {
              this_.question=datas.data.msg;
            }
          })
      },
      GetAnswer(){
        //保存当前对象
        var this_ = this;
        //封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('username', this.username);
        params.append('question', this.question);
        params.append('answer', this.answer);
        axios.post('/portal/user/forget_check_answer.do', params)
          .then(function (datas) {
            var status = datas.data.status
            console.log(datas)
            if(status!=0){
              Toast.fail(datas.data.msg);
            }else {
              this_.forgetToken=datas.data.msg;
              this_.question='';
              this_.answer='';
            }
          })
      },
      GetPasswordNew() {
        if (this.passwordNew != '' && this.password2 != '') {
          if (this.passwordNew == this.password2) {
            //保存当前对象
            var this_ = this;
            //封装前端传递给后端的数据
            var params = new URLSearchParams();
            params.append('username', this.username);
            params.append('forgetToken', this.forgetToken);
            params.append('passwordNew', this.passwordNew);
            if (this)
              axios.post('/portal/user/forget_reset_password.do', params)
                .then(function (datas) {
                  var status = datas.data.status
                  console.log(datas)
                  if (status != 0) {
                    Toast.fail(datas.data.msg);
                  } else {
                    Toast.fail(datas.data.msg);
                    this_.$router.push("/login");
                  }
                })
          }else{
            Toast.fail('两次密码必须相同');
          }
        }else{
          Toast.fail('密码不能为空');
        }
      }
    }
  };
</script>

<style scoped>

</style>
