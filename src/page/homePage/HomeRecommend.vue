<template>
  <div class="homeRecommend">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(imgSwipe, index) in imgSwipes" :key="index">
        <img :src="imgSwipe" class="img-swipe"/>
      </van-swipe-item>
    </van-swipe>
    <van-row class="four-type">
      <van-col span="6">
        <div class="color-round1">
          <img src="../../assets/images/article.png">
        </div>111
      </van-col>
      <van-col span="6">
        <div class="color-round2">
          <img src="../../assets/images/article.png">
        </div>222
      </van-col>
      <van-col span="6">
        <div class="color-round3">
          <img src="../../assets/images/article.png">
        </div>333
      </van-col>
      <van-col span="6">
        <div class="color-round4">
          <img src="../../assets/images/article.png">
        </div>444
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'homeRecommend',
  data() {
    return {
      imgSwipes: [
        require('@/assets/images/moveImg/1.png'),
        require('@/assets/images/moveImg/2.png'),
        require('@/assets/images/moveImg/3.png'),
        require('@/assets/images/moveImg/4.png')
      ],
    }
  }
}
</script>

<style lang="less">
.homeRecommend {
  .img-swipe {
    width: 100%;
  }
  .four-type {
    width: 85%;
    margin: 10px auto;
    text-align: center;
    font-size: 12px;
    img {
      width: 25px;
      height: 25px;
    }
    .color-round1 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);
      box-shadow: 0px 0px 20px rgba(134, 134, 134, 0.4);
      margin: 0 auto;
      margin-bottom: 5px;
    }
    .color-round2 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%);
      margin: 0 auto;
      margin-bottom: 5px;
    }
    .color-round3 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
      margin: 0 auto;
      margin-bottom: 5px;
    }
    .color-round4 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #CDDCDC; background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%); background-blend-mode: screen, overlay;
      margin: 0 auto;
      margin-bottom: 5px;
    }
  }
}
</style>