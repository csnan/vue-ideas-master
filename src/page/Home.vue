<template>
  <div class="home">
    <base-header :rightIcon="searchIcon" @toPage="toLogin"></base-header>
    <div class="tab-box">
      <div
       class="tab-item"
       v-for="(tab, index) in tabs"
       :key="index"
       @click="onTabsSwitch(index)"
       v-bind:class="{active:index==nowTabIndex}"
      >{{tab}}</div>
    </div>
    <div class="main-content">
      <van-notice-bar
        class="notice-bar"
        text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        left-icon="volume-o"
        mode="closeable"
      />
      <div class="tab-first" v-show="nowTabIndex===0">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(imgSwipe, index) in imgSwipes" :key="index">
            <img :src="imgSwipe" class="img-swipe"/>
          </van-swipe-item>
        </van-swipe>
        <!-- <van-row class="four-type">
          <van-col span="6">
            <div class="color-round"></div>111
          </van-col>
          <van-col span="6">
            <div class="color-round"></div>222
          </van-col>
          <van-col span="6">
            <div class="color-round"></div>333
          </van-col>
          <van-col span="6">
            <div class="color-round"></div>444
          </van-col>
        </van-row> -->
      </div>
      <div class="tab-second" v-show="nowTabIndex===1">22222</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      searchIcon: require('@/assets/images/search.png'),
      nowTabIndex: 0,
      tabs: ["推荐","圈子"],
      imgSwipes: [
        require('@/assets/images/moveImg/1.png'),
        require('@/assets/images/moveImg/2.png'),
        require('@/assets/images/moveImg/3.png'),
        require('@/assets/images/moveImg/4.png')
      ]
    }
  },
  methods: {
    onTabsSwitch(index) {
      this.nowTabIndex = index
    },
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .tab-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 50%;
    height: 45px;
    z-index: 999;
    .tab-item{
      width: 50%;
      height: 43px;
      line-height: 50px;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      color: rgb(173, 218, 255);
    }
    .tab-item.active {
      width: 50%;
      height: 43px;
      line-height: 50px;
      display: inline-block;
      text-align: center;
      border-bottom: 2px solid rgb(255, 255, 255);
      font-size: 14px;
      color: #FFF;
    }
  }
  .main-content {
    .notice-bar {
      height: 30px;
      font-size: 12px;
    }
    .tab-first {
      .img-swipe {
        width: 100%;
      }
      // .four-type {
      //   margin-top: 10px;
      //   text-align: center;
      //   font-size: 12px;
      //   .color-round {
      //     width: 50px;
      //     height: 50px;
      //     border-radius: 50%;
      //     background: red;
      //     margin: 0 auto;
      //     margin-bottom: 5px;
      //   }
      // }
    }
  }
}
</style>
