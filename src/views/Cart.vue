<template>
  <div class="cart">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <div v-for="(good,index) in goods" :key="index">

        <van-swipe-cell>

          <van-row>
            <van-col span="2">
              <van-checkbox-group v-model="result">
                <van-checkbox class="check" :name="good.productId" @click="OnChange(good.productId,good.productChecked)"></van-checkbox>
              </van-checkbox-group>
            </van-col>
            <van-col span="22">
              <van-card
                :price="good.price*good.quantity"
                :desc="good.subtitle"
                :title="good.name"
                :thumb="good.mainImage"
                @click-thumb="toGoods(good.productId)">
                <div slot="footer">
                  <van-stepper v-model="good.quantity" integer min="1" :max="goodss.stock" @change="AddGood(good.productId,good.quantity)" />
                </div>
              </van-card>
            </van-col>
          </van-row>

          <template slot="right">
            <div style="padding-top: 40px;padding-bottom:50px;background-color: #ee0c26;">
              <van-button square type="danger" text="删除" @click="OnDelete(good.productId)" />
            </div>
          </template>

        </van-swipe-cell>

      </div>

      <van-submit-bar
        :price="countprice*100"
        button-text="去结算"
        @submit="ToShop()"
      >
        <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
      </van-submit-bar>
    </van-pull-refresh>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/store';


  export default {
    name: 'Cart',
    store,
    data() {
      return {
        isLoading: false,
        goods:'',
        checked: false,
        goodss:'',
        countprice:0,
        result:[],
      };
    },
    methods:{
      onClickLeft() {
        var this_=this;
        this.$router.go(-1);//返回上一层
        this_.countprice=0;
        this_.result=[];
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      },
      toGoods(i){
        var this_ = this;
        store.state.goodId=i;
        this.$router.push("/goods");
      },
      //删除购物车商品
      OnDelete(productId){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        params.append('productIds',productId);
        //删除购物车商品
        axios.post('/portal/cart/delete_product.do',params)
          .then(function (datas) {
          })
        //更新购物车
        this.getCart();
      },
      //结算
      ToShop(){
        this.$router.push("/settlement");
      },
      //全选和取消全选
      selectAll(){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        //全选
        if(this_.checked===false){
          params.append('check',1);
          axios.post('/portal/cart/select_all.do',params)
            .then(function (datas) {
            })
          axios.post('/portal/cart/list.do')
            .then(function (datas) {
              this_.goods= datas.data.data.cartProductVOList;
              this_.result=[];
              for(var i=0;i<this_.goods.length;i++){
                if(this_.goods[i].productChecked==1){
                  this_.result.push(this_.goods[i].productId);
                }
              }
              //更新总价
              this_.countprice = datas.data.data.cartTotalPrice;
              //更改全选图标
              this_.checked = datas.data.data.allChecked;
            })
        }else{
          //取消全选
          params.append('check',0);
          axios.post('/portal/cart/un_select_all.do',params)
            .then(function (datas) {
              //更新总价
              this_.countprice = datas.data.data.cartTotalPrice;
              //更改全选图标
              this_.checked = datas.data.data.allChecked;
              //清空result数组，取消所有选中图标
              this_.result=[];
            })

        }

      },
      //选中和取消选中商品
      OnChange(goodId,check){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        params.append('productId', goodId);
        console.log("check:"+check);
        //取消选中商品
        if(check==1){
          params.append('check', 0);
          axios.post('/portal/cart/un_select.do',params)
            .then(function (datas) {
              //更改全选图标
              this_.checked=datas.data.data.allChecked;
              //更新总价
              this_.countprice=datas.data.data.cartTotalPrice;
            })
        }
        //选中商品
        else{
          params.append('check', 1);
          axios.post('/portal/cart/select.do',params)
            .then(function (datas) {
              //更改商品选中图标
              this_.checked=datas.data.data.allChecked;
              //更新总价
              this_.countprice=datas.data.data.cartTotalPrice;
            })
        }
        //更新goods中的选中信息
        axios.post('/portal/cart/list.do')
          .then(function (datas) {
              this_.goods= datas.data.data.cartProductVOList;
          })
      },
      //更改商品数量
      AddGood(goodId,value){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        var params = new URLSearchParams();
        params.append('productId', goodId);
        //获取商品库存，设置计步器最大值
        axios.post('/portal/product/detail.do',params)
          .then(function (datas) {
            var status = datas.data.status;
            if(status===0){
              this_.goodss = datas.data.data;
            }
          })
        params.append('count', value);
        axios.post('/portal/cart/update.do',params)
          .then(function (datas) {
            //更新总价
            this_.countprice=datas.data.data.cartTotalPrice;
          })
      },
      //获取用户购物车数据
      getCart(){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        //获取选中商品
        axios.post('/portal/cart/list.do')
          .then(function (datas) {
            var status = datas.data.status;
            if(status===0){
              this_.goods= datas.data.data.cartProductVOList;
              for(var i=0;i<this_.goods.length;i++){
                if(this_.goods[i].productChecked===1){
                  this_.result.push(this_.goods[i].productId);
                }
              }
              //更新总价
              this_.countprice=datas.data.data.cartTotalPrice;
              //更改商品选中图标
              this_.checked=datas.data.data.allChecked;
            }
          })
      }
    },
  activated:function () {
    this.getCart();
  }
  }
</script>

<style scoped>
  .check{
    padding-top: 40px;
    padding-left: 10px;
  }

</style>
