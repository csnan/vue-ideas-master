<template>
  <div class="my">
    <base-header 
      :bgColor="'rgba(27, 190, 231,' + opacityNum + ')'"
      :rightIcon="setIcon"
    ></base-header>
    <div
     class="personal-card"
     :style="{ 'background': 'url(' + bgImg + ') no-repeat center center', 'background-size': '100%' }"
     >
      <div class="head-image">
        <img src="../assets/images/1.jpeg">
      </div>
    </div>
    <div class="content-my">
      <div class="content-one">
        <span class="user-name">OKOer</span>
      </div>
      <div class="content-two">
        <van-row class="interact-number">
          <van-col span="8">1</van-col>
          <van-col span="8">1</van-col>
          <van-col span="8">1</van-col>
        </van-row>
        <van-row class="interact-name">
          <van-col span="8">粉丝</van-col>
          <van-col span="8">关注</van-col>
          <van-col span="8">访客</van-col>
        </van-row>
      </div>
      <div class="content-three">
        <van-row>
          <van-col span="6">
            <div>
              <img src="../assets/images/vip.png">
            </div>
            <div>VIP</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/collection.png">
            </div>
            <div>收藏</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/service.png">
            </div>
            <div>服务</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/history.png">
            </div>
            <div>足迹</div>
          </van-col>
        </van-row>
      </div>
      <div class="gray-block"></div>
      <van-tabs
        class="tab-box" 
        v-model="active" 
        :offset-top="45" 
        :line-width="30" 
        color="#1BBEE7" 
        sticky 
        animated 
        swipeable
      >
        <van-tab 
          v-for="(tab, index) in tabList"
          :key="index" 
          :title="tab"
        >
          <div class="tab-first" v-show="active === 0">
            0000
          </div>
          <div class="tab-second" v-show="active === 1">
            1111
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import baseHeader from '../components/BaseHeader'
export default {
  name: 'my',
  components: {
    baseHeader
  },
  data() {
    return {
      opacityNum: 0,
      setIcon: require('@/assets/images/set.png'),
      bgImg: require('@/assets/images/1.jpeg'),
      active: 0,
      tabList: [ '动态', '作品' ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onHandleScroll)
  },
  methods: {
    //滚动时顶部导航背景透明度变化
    onHandleScroll() {
      //var headerTop = document.getElementById('headerTop')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 0 && scrollTop <= 180) {
        this.opacityNum = scrollTop/180
      } else if (scrollTop > 180) {
        this.opacityNum = 1
      } else {
        this.opacityNum = 0
      }
    }
  },
}
</script>

<style lang="less" scoped>
.my{
  .personal-card {
    height: 180px;
    position: relative;
    z-index: 1;
  }
  .personal-card::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }
  .head-image {
    width: 80px;
    height: 80px;
    position: absolute;
    margin-top: 139px;
    margin-left: 15px;
    border-radius: 50%;
    border: 2px solid #FFF;
    overflow: hidden;
    z-index: 3;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .content-my {
    .content-one{
      height: 50px;
      .user-name {
        margin-left: 110px;
        line-height: 50px;
        font-size: 18px;
      }
    }
    .content-two {
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(240, 240, 240);
      text-align: center;
      .interact-number {
        font-size: 18px;
      }
      .interact-name {
        margin-top: 5px;
        font-size: 10px;
        color: rgb(180, 180, 180);
      }
    }
    .content-three {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      font-size: 10px;
      color: rgb(82, 95, 110);
      img {
        width: 40px;
        height: 40px;
      }
    }
    .gray-block {
      height: 10px;
      background: rgb(240, 240, 240);
    }
    .tab-box {
      .tab-first {
        padding: 5px 15px;
      }
      .tab-second {
        padding: 5px 15px;
      }
    }
  }
}
</style>
<style lang="less">
.my {
  .van-tab--active {
    color: @base-color;
  }
}
</style>
