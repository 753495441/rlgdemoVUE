<template>
  <div class="cart">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

      <top-back :content="title"></top-back>

    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value2" :options="option3" />
    </van-dropdown-menu>

      <van-card
        :num="num"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      >
        <div slot="tags">
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini" @click="sub">-</van-button>
          <van-button size="mini" @click="add">+</van-button>
        </div>
      </van-card>

      <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit=""
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
        <span slot="tip">
    你的收货地址不支持同城送, <span>修改地址</span>
  </span>
      </van-submit-bar>

    </van-pull-refresh>
  </div>
</template>

<script>
  import TopBack from '@/components/TopBack.vue';


  export default {
    name: 'Cart',
    components:{
      TopBack
    },
    data() {
      return {
        title:'购物车',
        isLoading: false,
        value1: 0,
        value2: 'a',
        option1: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ],
        option2: [
          { text: '默认排序', value: 'a' },
          { text: '好评排序', value: 'b' },
          { text: '销量排序', value: 'c' },
        ],
        option3: [
          { text: '默认分类', value: 'a' },
          { text: '食品饮料', value: 'b' },
          { text: '服装', value: 'c' },
        ],
        num:1
      };
    },
    methods:{
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      },
      sub(){
        if (this.num>=1){
          this.num--;
        }else {
          this.num=0;
        }
      },
      add(){
        this.num++;
      }
    },
  }
</script>

<style scoped>

</style>
