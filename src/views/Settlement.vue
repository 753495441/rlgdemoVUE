<template>
  <div class="settlement">
    <van-sticky :offset-top="0">
      <top-back :content="title"/>
    </van-sticky>

    <van-contact-card
      type="cardType"
      :name="address.receiverName"
      :tel="address.receiverMobile"
      @click="ToAddress"
    />

    <div v-for="(good,index) in goods" :key="index">

      <van-swipe-cell>

        <van-row>
          <van-card
            :price="good.price*good.quantity"
            :desc="good.subtitle"
            :title="good.name"
            :thumb="good.mainImage"
            @click-thumb="toGoods(good.productId)">
            <div slot="footer">
              <van-stepper v-model="good.quantity" integer min="1" :max="goodss.stock"
                           @change="AddGood(good.productId,good.quantity)"/>
            </div>
          </van-card>
        </van-row>

      </van-swipe-cell>

    </div>

    <van-submit-bar
      :price="countprice*100"
      button-text="提交订单"
      @submit="OnSubmit"
    >
    </van-submit-bar>

  </div>
</template>

<script>
  import TopBack from '@/components/TopBack.vue';
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'Settlement',
    store,
    components: {
      TopBack
    },
    data() {
      return {
        title: '填写订单',
        checkGoods: [],
        goods: '',
        countprice: 0,
        goodss: '',
        address: [],
      };
    },
    methods: {
      //更改商品数量
      AddGood(goodId, value) {
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        params.append('productId', goodId);
        //获取商品库存，设置计步器最大值
        axios.post('/portal/product/detail.do', params)
          .then(function (datas) {
            var status = datas.data.status;
            if (status === 0) {
              this_.goodss = datas.data.data;
            }
          });
        params.append('count', value);
        axios.post('/portal/cart/update.do', params)
          .then(function (datas) {
            //更新总价
            this_.countprice = datas.data.data.cartTotalPrice;
          });
      },
      //获取用户购物车选中的商品数据
      getCart() {
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        //获取选中商品
        axios.post('/portal/cart/list.do')
          .then(function (datas) {
            var status = datas.data.status;
            if (status === 0) {
              this_.goods = datas.data.data.cartProductVOList;
              for (var i = 0; i < this_.goods.length; i++) {
                if (this_.goods[i].productChecked === 1) {
                  this_.checkGoods.push(this_.goods[i]);
                }
              }
              //更新总价
              this_.countprice = datas.data.data.cartTotalPrice;
            }
          });
      },
      //获取登录用户收货地址
      getAddress() {
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        //获取收货地址
        axios.post('/portal/address/search.do')
          .then(function (datas) {
            this_.address = datas.data.data[store.state.shippingId];
          });
      },
      //设置收货地址
      ToAddress() {
        this.$router.push('/setaddress');
      },
      //提交用户默认地址，创建订单
      OnSubmit() {
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        params.append('shippingId', store.state.shippingId+1);
        //传默认收货地址，创建订单
        axios.post('/portal/order/create.do', params)
          .then(function (datas) {
            store.state.orderNos = datas.data.data.orderNo;
          });
        this.$router.push('/payin');
      },
    },
    activated: function () {
      this.getCart();
      this.getAddress();
    }
  };
</script>

<style scoped>

</style>
