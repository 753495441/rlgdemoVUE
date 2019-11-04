<template>
  <div class="setaddress">
    <top-back :content="title"></top-back>

    <van-radio-group v-model="radio" v-for="(adds,index) in address" :key="index">
      <van-cell-group>
        <van-cell
          :title="adds.receiverName+','+adds.receiverMobile"
          :label="adds.receiverAddress"
          @click="setAddress(adds.id)">
          <van-radio slot="right-icon" :name="adds.id" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

  </div>
</template>

<script>
  import TopBack from '@/components/TopBack.vue';
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'SetAddress',
    store,
    components: {
      TopBack
    },
    data() {
      return {
        title: '收货地址管理',
        radio:'',
        address: [],
      };
    },
    methods: {
      //设置默认用户收货地址
      setAddress(shippingId){
        var this_=this;
        this_.radio=shippingId;
        store.state.shippingId=shippingId;
        this.$router.go(-1);
      },
      //获取登录用户收货地址
      getAddress() {
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        //获取收货地址
        axios.post('/portal/address/search.do')
          .then(function (datas) {
            this_.address = datas.data.data;
          });
      },
    },
    activated: function () {
      this.getAddress();
    }
  };
</script>

<style scoped>

</style>
