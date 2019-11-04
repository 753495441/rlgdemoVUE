<template>
  <div class="home">
    <van-row>
      <van-col class="TopLogin" span="4" @click="ToCateGory">
        <van-icon size="30px" name="apps-o"/>
      </van-col>
      <van-col span="20">
        <van-search
          class="TopSerch"
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="sorry">
          <div slot="action" @click="ToLogin">登录</div>
        </van-search>
      </van-col>
    </van-row>

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img v-lazy="image.mainImage"  class="dt"/>
      </van-swipe-item>
    </van-swipe>

    <van-image
      width="100%"
      height="100"
      src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180917/45ba4df16cd347f2bfb2129101f9edde.jpeg"
    />

    <van-grid :border="false" :column-num="4">
      <van-grid-item>
        <van-icon size="30px" name="shopping-cart"/>
        <van-grid-item text="线上超市" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="photograph" />
        <van-grid-item text="数码电器" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="bag" />
        <van-grid-item text="潮流服饰" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="weapp-nav" />
        <van-grid-item text="生鲜食品" />
      </van-grid-item>
    </van-grid>
    <van-grid :border="false" :column-num="4">
      <van-grid-item>
        <van-icon size="30px" name="send-gift" />
        <van-grid-item text="送货到家" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="balance-list" />
        <van-grid-item text="充值缴费" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="todo-list" />
        <van-grid-item text="签到" />
      </van-grid-item>
      <van-grid-item>
        <van-icon size="30px" name="diamond" />
        <van-grid-item text="会员" />
      </van-grid-item>
    </van-grid>

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      为你推荐
    </van-divider>

    <van-row>
      <van-col span="12" @click="ToGoods(0)">
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[0].mainImage" />
          <div>{{this.goods[0].subtitle}}</div>
          <div>{{'$'+this.goods[0].price}}</div>
        </van-panel>
      </van-col>
      <van-col span="12" @click="ToGoods(1)">
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[1].mainImage" />
          <div>{{this.goods[1].subtitle}}</div>
          <div>{{'$'+this.goods[1].price}}</div>
        </van-panel>
      </van-col>
      <van-col span="12" @click="ToGoods(2)">
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[2].mainImage" />
          <div>{{this.goods[2].subtitle}}</div>
          <div>{{'$'+this.goods[2].price}}</div>
        </van-panel>
      </van-col>
      <van-col span="12" @click="ToGoods(3)" >
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[3].mainImage"/>
        <div>{{this.goods[3].subtitle}}</div>
          <div>{{'$'+this.goods[3].price}}</div>
      </van-panel>
      </van-col>
      <van-col span="12" @click="ToGoods(4)">
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[4].mainImage"/>
          <div>{{this.goods[4].subtitle}}</div>
          <div>{{'$'+this.goods[4].price}}</div>
        </van-panel>
      </van-col>
      <van-col span="12" @click="ToGoods(5)">
        <van-panel>
          <van-image width="100%" height="150px" :src="this.goods[5].mainImage"/>
          <div>{{this.goods[5].subtitle}}</div>
          <div>{{'$'+this.goods[5].price}}</div>
        </van-panel>
      </van-col>
    </van-row>
    <br>
    <br>
    <br>
    <br>

  </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/store';

export default {
  name: 'home',
  store,
  data() {
    return {
      images: '',
      goods:'',
      value:'',
    };
  },
  methods:{
    ToLogin(){
      this.$router.push("/login")
    },
    ToGoods(i){
      var this_ = this;
      store.state.goodId=this_.goods[i].id;
      this.$router.push("/goods");
    },
    ToCateGory(){
      this.$router.push("/category")
    },
    sorry(){
      Toast('暂无后续逻辑~');
    },
    //轮播图片
    getGoods(){
      //保存当前对象
      var this_ = this;
      //执行请求获取后端数据
      axios.post('/portal/product/detailNewOrHotOrBanner.do')
        .then(function (datas) {
          var status = datas.data.status;
          if(status===0){
            this_.images=datas.data.data;
            this_.goods= datas.data.data;
          }
        })
    },
  },
  activated:function () {
    this.getGoods();
  }
}
</script>

<style scoped>
  .dt{
    height:120px;
    width: 100%;
  }
  .TopLogin{
    padding-top: 12px;
    padding-right: 0;
  }
  .TopSerch{
    padding-left: 0;
  }
</style>
