import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  //定义组件状态
  state: {
    users:'',
    goods:'',
    goodId:'',
  },
  //改变状态方法
  mutations: {
    exit(){
      this.state.users=''
    }
  },
  actions: {

  },
});
