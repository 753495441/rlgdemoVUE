<template>
  <div class="category">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <van-row>
      <van-col span="8">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="推荐分类" />
          <van-sidebar-item title="线上超市" />
          <van-sidebar-item title="国际名牌" />
          <van-sidebar-item title="奢侈品" />
          <van-sidebar-item title="海囤全球" />
          <van-sidebar-item title="男装" />
          <van-sidebar-item title="女装" />
          <van-sidebar-item title="男鞋" />
          <van-sidebar-item title="女鞋" />
          <van-sidebar-item title="箱包手袋" />
          <van-sidebar-item title="生活用品" />
          <van-sidebar-item title="海鲜食材" />
        </van-sidebar>
      </van-col>
      <van-col span="16">

        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image,index) in images" :key="index">
            <img v-lazy="image"  class="dt"/>
          </van-swipe-item>
        </van-swipe>

        <van-row>
          <van-col span="8" style="font-family: 黑体">常用分类</van-col>
        </van-row>

        <van-grid :border="false" :column-num="3">
          <van-grid-item text="文字">
            <van-image src="http://img1.imgtn.bdimg.com/it/u=4073710274,1004782329&fm=26&gp=0.jpg"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img.365hele.com/upload/1560/store/101/e17bf1ad-54fe-4071-9a5b-87528f003585.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img4.imgtn.bdimg.com/it/u=2727047860,2706727414&fm=26&gp=0.jpg" />
          </van-grid-item>
        </van-grid>

        <van-row>
          <van-col span="8">饼干</van-col>
          <van-col span="8">蛋糕</van-col>
          <van-col span="8">鼠标</van-col>
        </van-row>

        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <van-image src="http://img3.imgtn.bdimg.com/it/u=3771351744,1941809953&fm=15&gp=0.jpg"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img1.imgtn.bdimg.com/it/u=449822798,2165948513&fm=26&gp=0.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://www.1024sj.com/uploadimg/jijiacheng/wmFPqgnUk_1320821898.jpg" />
          </van-grid-item>
        </van-grid>
        <van-row>
          <van-col span="8">手机壳</van-col>
          <van-col span="8">枕巾枕套</van-col>
          <van-col span="8">电子秤</van-col>
        </van-row>

        <br>
        <van-row>
          <van-col span="8" style="font-family: 黑体">专场推荐</van-col>
        </van-row>

        <van-grid :border="true" :column-num="3">
          <van-grid-item>
            <van-image src="http://shihuo.hupucdn.com/ucditor/20171104/720x720_d0f719861842e9389eb3c7d51e41d9aa.jpeg"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://f.3dxy.com/sub/Manual/pic/2015/1229/07/1512290724_34779_2000x_1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img4.imgtn.bdimg.com/it/u=1147281618,1921497340&fm=26&gp=0.jpg" />
          </van-grid-item>
        </van-grid>
        <van-row>
          <van-col span="8" style="font-size:14px">第二件0元</van-col>
          <van-col span="8" style="font-size:14px">家具家装节</van-col>
          <van-col span="8" style="font-size:14px">手机盛典</van-col>
        </van-row>

        <br>
        <van-row>
          <van-col span="8" style="font-family: 黑体">热门分类</van-col>
        </van-row>

        <van-grid :border="true" :column-num="3">
          <van-grid-item>
            <van-image src="http://img.ithome.com/newsuploadfiles/2019/6/20190603_083459_0.png"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img.shushi100.com/images/8cc1f743-6cfc-4ced-8375-d6cc0e0c9a0b.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img4.imgtn.bdimg.com/it/u=1147281618,1921497340&fm=26&gp=0.jpg" />
          </van-grid-item>
        </van-grid>

        <van-row>
          <van-col span="8" style="font-size:14px">笔记本</van-col>
          <van-col span="8" style="font-size:14px">空调</van-col>
          <van-col span="8" style="font-size:14px">手机</van-col>
        </van-row>

        <van-grid :border="true" :column-num="3">
          <van-grid-item>
            <van-image src="http://static.jisutui.vip/data/upload/2019/05/75023563d3yqlbot.jpg"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img1.lukou.com/static/p/commodity/medium/0009/92/39/53/9923953.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://ku.90sjimg.com/element_origin_min_pic/16/11/04/3b2d5fec78cda4ed1e04a3bc7ace796d.jpg" />
          </van-grid-item>
        </van-grid>

        <van-row>
          <van-col span="8" style="font-size:14px">服饰</van-col>
          <van-col span="8" style="font-size:14px">休闲零食</van-col>
          <van-col span="8" style="font-size:14px">生鲜</van-col>
        </van-row>

        <van-grid :border="true" :column-num="3">
          <van-grid-item>
            <van-image src="http://5b0988e595225.cdn.sohucs.com/images/20181102/e73fd3649dd94474a87ae6ac5f03ce40.jpeg"/>
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img5.imgtn.bdimg.com/it/u=2881236485,3170871238&fm=26&gp=0.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://www.wto168.net/uploads/userup/1238/13V120A5-1034.jpg" />
          </van-grid-item>
        </van-grid>

        <van-row>
          <van-col span="8" style="font-size:14px">图书</van-col>
          <van-col span="8" style="font-size:14px">面膜</van-col>
          <van-col span="8" style="font-size:14px">投资金</van-col>
        </van-row>

        <van-grid :border="true" :column-num="3">
          <van-grid-item>
            <van-image src="http://image3.buy.ccb.com/images/89701749/1416485991367_4.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img002.hc360.cn/m6/M05/A3/30/wKhQolWzRRyEL-3SAAAAAEWxxFg777.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="http://img.officemate.cn/public/images/4d/9b/52/d62885ed0015729ae1922867d8eb6564d70ff97e.jpg" />
          </van-grid-item>
        </van-grid>

        <van-row>
          <van-col span="8" style="font-size:14px">瑞表</van-col>
          <van-col span="8" style="font-size:14px">牛奶</van-col>
          <van-col span="8" style="font-size:14px">纸品湿巾</van-col>
        </van-row>
        <br>
        <br>
        <br>
        <br>

      </van-col>
    </van-row>


  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        activeKey: 0,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg'
        ]
      };
    }
  };
</script>

<style scoped>
  .dt{
    height:120px;
    width: 100%;
  }
  .text{
    padding-left: 0px;
    padding-bottom: 0px;
  }
</style>
