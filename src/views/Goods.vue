<template>
  <div class="goods">
    <top-back :content="title"></top-back>

    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(srchost,index) in goods.subImages" :key="index">
        <img :src="srchost" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.subtitle }}</div>
        <div class="goods-price">{{ goods.price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：免运费</van-col>
        <van-col span="14">剩余：{{ goods.stock }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-panel>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      商品详情
    </van-divider>

      <van-image
        width="100%"
        height="10rem"
        fit="contain"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <p>{{goods.detail}}</p>
    </van-panel>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goodss"
      :goods-id="goodsId"
      :show-add-cart-btn="false"
      buy-text="确定"
      @buy-clicked="addOne"
    />

    <van-goods-action id="vga">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" to="/cart" :info="num">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="OnClickCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>
<script>
  import axios from 'axios';
  import TopBack from '@/components/TopBack.vue';
  import store from '@/store';

  export default {
    name: 'Goods',
    store,
    components:{
      TopBack
    },
    data() {
      return {
        title:'商品详情',
        goods: '',
        num:0,
        show: false,
        sku: {
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          hide_stock: false, // 是否隐藏剩余库存
          tree: [
            {
              k: '尺寸', // skuKeyName：规格类目名称
              k_id:'1',
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '天蓝色', // skuValueName：规格值名称
                  imgUrl:'https://img.yzcdn.cn/2.jpg'
                },
                {
                  id: '1215',
                  name: '白色',
                  imgUrl:'https://img.yzcdn.cn/2.jpg'
                }
              ],
              k_s: 's1',
              count:2
            },
            {
              k: '尺寸', // skuKeyName：规格类目名称
              k_id:'2',
              v: [
                {
                  id: '1192', // skuValueId：规格值 id
                  name: '1', // skuValueName：规格值名称
                },
                {
                  id: '1193',
                  name: '2',
                }
              ],
              k_s: 's2',
              count:2
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              discount:100,
              code:'',
              s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1192', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              s4:'0',
              s5:'0',
              stock_num: 110, // 当前 sku 组合对应的库存
              goods_id:946755
            },
            {
              id: 2257, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              discount:100,
              code:'',
              s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1192', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              s4:'0',
              s5:'0',
              stock_num: 110, // 当前 sku 组合对应的库存
              goods_id:946755
            },
            {
              id: 2258, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              discount:100,
              code:'',
              s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              s4:'0',
              s5:'0',
              stock_num: 110, // 当前 sku 组合对应的库存
              goods_id:946755
            }
          ],
        },
        goodsId:'',
        goodss: {
          // 商品标题
          title: '测试商品',
          // 默认商品 sku 缩略图
          picture: 'https://img.yzcdn.cn/1.jpg'
        },
      };
    },
    methods:{
      addOne(){
        this.$toast.success('加入成功~');
        this.show=false;
      },
      OnClickCart(){
        this.show=true;
      },
      sorry(){
      },
      //获取商品详情
      getProductsDetil(){
        //保存当前对象
        var this_ = this;
        var params = new URLSearchParams();
        this_.goodsId=store.state.goodId;
        params.append('productId', this_.goodsId);
        console.log(this_.goodsId);
        //执行请求获取后端数据
        axios.post('/portal/product/detail.do', params)
          .then(function (datas) {

            var status = datas.data.status;
            if(status!=0){
              // Toast.fail(datas.data.msg);
            }else {
              this_.goods=datas.data.data
            }
          })
      },
      //获取购物车中商品条数
      getCartNum(){
        //保存当前对象
        var this_ = this;
        //执行请求获取后端数据
        axios.post('/portal/cart/get_cart_product_count.do')
          .then(function (datas) {
            //获取状态码
            var status = datas.data.status;
            //成功后重新赋值
            if(status==0){
              this_.num=datas.data.data
            }
          })
      }
    },
    //组件加载就执行的方法
    activated:function () {
      this.getProductsDetil();
      this.getCartNum();
    }
  };
</script>
<style scoped lang="less">
  #vga{
    z-index: 100;
  }
  .goods {
    margin-bottom: 150px;
  &-swipe {
  img {
    width: 100%;
    display: block;
    height: 300px;
  }
  }
  &-title {
     font-size: 16px;
   }
  &-price {
     color: #f44;
   }
  &-express {
     color: #999;
     font-size: 12px;
     padding: 5px 15px;
   }
  &-cell-group {
     margin: 15px 0;
  .van-cell__value {
    color: #999;
  }
  }
  &-tag {
     margin-left: 5px;
   }
  }
</style>


