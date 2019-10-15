<template>
  <div class="evaluation">
    <van-nav-bar
      title="评价晒单"
      left-text="返回"
      right-text="提交"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-row type="flex" justify="center">
      <van-cell>
        <van-col span="12">
          <van-image
            width="100"
            height="100"
            src="https://img.yzcdn.cn/vant/t-thirt.jpg"
          />
        </van-col>
        <van-col span="12">
          <van-grid :border="false" :column-num="1">
            <van-grid-item/>
            <van-grid-item>
              <van-rate
                v-model="value"
                allow-half
                void-icon="star"
                void-color="#eee"
              />
            </van-grid-item>
            <van-grid-item/>
          </van-grid>

        </van-col>
      </van-cell>
    </van-row>

    <van-row type="flex">
      <van-col span="12" style="font-size: small">分享你的使用体验吧</van-col>
      <van-col span="6"/>
    </van-row>

    <van-cell-group>
      <van-cell>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="感觉怎么样？跟大家分享一下吧"
          rows="5"
          autosize
        />
      </van-cell>
    </van-cell-group>

    <van-cell-group :border="true">
      <van-uploader upload-text="添加图片/视频" :after-read="afterRead"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-checkbox v-model="checked" checked-color="red">匿名评价</van-checkbox>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="继续评价，赢得更多积分~" value=""/>
      <van-cell title="物流服务评价" value="评完有机会赢10积分"/>
    </van-cell-group>

      <van-grid :border="false" :column-num="2">
        <van-grid-item>
              快递包装
        </van-grid-item>
          <van-grid-item>
              <van-rate
                v-model="value1"
                allow-half
                void-icon="star"
                void-color="#eee"
              />
        </van-grid-item>
        <van-grid-item>
          送货速度
        </van-grid-item>
        <van-grid-item>
          <van-rate
            v-model="value2"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
        </van-grid-item>
        <van-grid-item>
          配送员服务
        </van-grid-item>
        <van-grid-item>
          <van-rate
            v-model="value3"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
        </van-grid-item>
      </van-grid>



  </div>
</template>

<script>
  export default {
    name: 'Evaluation',
    data() {
      return {
        value: 0,
        value1: 0,
        value2: 0,
        value3: 0,
        checked: true
      };
    },
    methods: {
      onClickLeft() {
        this.$router.push('/order');
      },
      onClickRight() {
        Toast('暂无后续逻辑~');
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      }
    }
  };
</script>

<style scoped>

</style>
