<template>
  <div class="userCenter">
    <base-header 
      titleTop="个人主页" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      :bgColor="'rgba(27, 190, 231,' + opacityNum + ')'"
      @goBack="toBack" 
    ></base-header>
    <div
     class="personal-card"
     :style="{ 'background': 'url(' + coverImg + ') center center / 100% no-repeat ' }"
     >
      <div class="head-image">
        <img :src="headImg">
      </div>
    </div>
    <div class="content-userCenter">
      <div class="content-wrap">
        <div class="content-one">
          <span class="user-name">{{myName}}</span>
          <img :src="sexIcon" alt="">
        </div>
        <div class="content-two">
          <van-row class="interact-number">
            <van-col span="8">1</van-col>
            <van-col span="8">1</van-col>
            <van-col span="8">1</van-col>
          </van-row>
          <van-row class="interact-name">
            <van-col span="8">关注</van-col>
            <van-col span="8">粉丝</van-col>
            <van-col span="8">人气</van-col>
          </van-row>
        </div>
      </div>
      <div class="my-introduction">
        <div class="introduction-title">个人简介</div>
        <div class="introduction-content">{{introduction}}</div>
      </div>
      <div class="edit-button-box">
        <van-button class="edit-button" size="normal" @click="toEditInfo">
          <img src="../../assets/images/edit2.png" alt="">
          <span>编辑个人资料</span>
        </van-button>
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
import { postObtainUserInfo } from "@/api/index"
export default {
  name: 'userCenter',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      opacityNum: 0,
      coverImg: this.$store.state.coverImgData,
      active: 0,
      tabList: [ '动态', '作品' ],
      headImg: this.$store.state.headImgData,
      myName: this.$store.state.usernameData,
      sex: this.$store.state.sexData,
      sexIcon: '',
      introduction: this.$store.state.introductionData
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onHandleScroll)
    if(this.sex == 'male') {
      this.sexIcon = require('@/assets/images/male.png')
    } else {
      this.sexIcon = require('@/assets/images/female.png')
    }
  },
  methods: {
    toBack() {
      this.$router.push('/my')
    },
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
    },
    
    toEditInfo() {
      this.$router.push('/editInfo')
    }
  }
}
</script>

<style lang="less" scoped>
.userCenter {
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
    margin-top: 160px;
    margin-left: 15px;
    border-radius: 50%;
    border: 2px solid #FFF;
    overflow: hidden;
    z-index: 3;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content-userCenter {
    .content-wrap {
      margin-left: 110px;
      .content-one {
        height: 50px;
        .user-name {
          line-height: 50px;
          font-size: 18px;
          vertical-align: middle;
        }
        img {
          width: 15px;
          height: 15px;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .content-two {
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .interact-number {
          font-size: 18px;
        }
        .interact-name {
          margin-top: 5px;
          font-size: 10px;
          color: rgb(180, 180, 180);
        }
      }
    }
    .my-introduction {
      padding: 10px 15px;
      .introduction-title {
        font-size: 14px;
      }
      .introduction-content {
        margin-top: 5px;
        font-size: 14px;
        color: rgb(128, 128, 128);
      }
    }
    .edit-button-box {
      padding: 10px 15px;
      .edit-button {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: @base-color;
        border: 1px solid @base-color;
        font-size: 12px;
        img {
          width: 12px;
          height: 12px;
          vertical-align: middle;
        }
        span {
          margin-left: 5px;
          vertical-align: middle;
        }
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
.userCenter {
  .van-tab--active {
    color: @base-color;
  }
}
</style>