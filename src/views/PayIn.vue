<template>
    <div class="payin">
      <img
        width="100%"
        height="100%"
        :src="images"/>
    </div>
</template>

<script>
  import TopBack from '@/components/TopBack.vue';
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'PayIn',
    store,
    components:{
      TopBack
    },
    data(){
      return{
        images:''
      }
    },
    methods:{
      getImages(){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        //生成支付二维码
        params.append('orderNo', store.state.orderNos);
        axios.post('/portal/order/pay.do', params)
          .then(function (datas) {
            console.log(datas.data);
            var str =datas.data.data.qrCode.split("/")
            this_.images = ("/"+str[2]+"/"+str[3]);
            console.log(this_.images);
          });
      }
    },
    activated:function () {
      this.getImages();
    }
  };
</script>

<style scoped>

</style>
