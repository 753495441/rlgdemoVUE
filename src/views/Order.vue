<template>
    <div class="order">
      <van-nav-bar title="全部订单" left-text="返回" left-arrow @click-left="onClickLeft">
        <van-icon name="chat-o" slot="right" size="23px" />
      </van-nav-bar>

      <div>
        <van-nav-bar left-text="店铺名">
          <van-icon name="cross" slot="right" size="23px" />
        </van-nav-bar>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      >
        <div slot="footer">
          <van-row>
            <van-col offset="12" span="12">共2件商品 实付款: 2</van-col>
          </van-row>
        </div>
        <div slot="footer">
          <van-button @click="tzEvaluation">评价晒单</van-button>
          <van-button>再次购买</van-button>
        </div>
      </van-card>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'Order',
    methods: {
      onClickLeft() {
        this.$router.push("/user");
      },
      tzEvaluation(){
        this.$router.push("/evaluation");
      }
    }
  };
</script>

<style scoped>

</style>
