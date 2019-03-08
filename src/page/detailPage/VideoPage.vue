<template>
  <div class="videoPage">
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <video
        class="video-source"
        width="100%"
        height="200"
        controls="controls" 
        preload="auto" 
        poster="../../assets/images/3.jpg" 
        x5-video-player-fullscreen="true" 
        webkit-playsinline="true" 
        x-webkit-airplay="true" 
        playsinline="true" 
        x5-playsinline 
      >  
       <source src="../../assets/images/video22.mp4" type="video/mp4">
      </video>
      <div class="video-title">流浪地球前传哈哈哈哈</div>
      <van-cell class="video-author" title="OKOer" :border="false" center>
        <div class="head-image" slot="icon">
          <img src="../../assets/images/1.jpeg">
        </div>
        <van-button 
          class="focus-button" 
          slot="right-icon" 
          size="small" 
          type="primary"
          @click="onFocus()" 
          plain
        >+ 关注</van-button>
      </van-cell>
      <div class="video-detail">
        <span>1142次播放</span>
        <span>2019-03-07</span>
      </div>
      <van-row class="video-four-handle">
        <van-col span="6">
          <div>
            <img src="../../assets/images/like4.png">
          </div>12345
        </van-col>
        <van-col span="6">
          <div>
            <img src="../../assets/images/collection2.png">
          </div>5645
        </van-col>
        <van-col span="6">
          <div>
            <img src="../../assets/images/comment3.png">
          </div>45612
        </van-col>
        <van-col span="6">
          <div>
            <img src="../../assets/images/share2.png">
          </div>转发
        </van-col>
      </van-row>
      <div class="gray-block"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png')
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="less" scoped>
.videoPage {
  .main-content {
    .video-source {
      background: rgb(0, 0, 0);
      border-bottom: 1px solid rgb(240, 240, 240);
    }
    .video-title {
      margin-top: 15px;
      padding: 0 15px;
      font-size: 18px;
    }
    .video-author {
      .head-image {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .focus-button {
        border: 1px solid rgb(246, 131, 12);
        color: rgb(246, 131, 12);
      }
    }
    .video-detail {
      padding: 0 15px;
      font-size: 12px;
      color: rgb(136, 136, 136);
      span {
        margin-right: 10px;
      }
    }
    .video-four-handle {
      width: 90%;
      margin: 25px auto 10px auto;
      text-align: center;
      font-size: 12px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .gray-block {
      height: 1px;
      background: rgb(240, 240, 240);
    }
  }
}
</style>

