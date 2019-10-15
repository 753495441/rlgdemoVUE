<template>
    <div>
      <!--导航栏-->
      <van-nav-bar
        :title="content"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
</template>

<script>
  export default {
    name: 'TopBack',
    props:['content'],
    data(){
      return{

      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);//返回上一层
      }
    }

  };
</script>

<style scoped>

</style>
