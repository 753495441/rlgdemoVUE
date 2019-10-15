<template>
<div class="free">

  <van-nav-bar
    title="优惠券"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <!-- 优惠券单元格 -->
  <van-coupon-cell
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @click="showList = true"
  />

  <!-- 优惠券列表 -->
  <van-popup v-model="showList" position="bottom">
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
    />
  </van-popup>

</div>
</template>
<script>
  export default {
    name: 'free',
    data() {
      return {
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon]
      }
    },

    methods: {
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
      onClickLeft() {
        this.$router.push("/user");
      }
    }
  };
</script>

<style scoped>

</style>
