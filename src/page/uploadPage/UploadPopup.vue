<template>
  <div class="uploadPopup">
    <van-row class="four-type-wrap">
      <van-col span="6">
        <transition name="van-slide-up">
          <div v-show="visible1" @click="toUploadArticle">
            <div class="boder-round">
              <img src="../../assets/images/uploadImg/article.png">
            </div>文章
          </div>
        </transition>
      </van-col>
      <van-col span="6">
        <transition name="van-slide-up">
          <div v-show="visible2" @click="toUploadPhoto">
            <div class="boder-round">
              <img src="../../assets/images/uploadImg/photo.png">
            </div>图片
          </div>
        </transition>
      </van-col>
      <van-col span="6">
        <transition name="van-slide-up">
          <div v-show="visible3" @click="toUploadMusic">
            <div class="boder-round">
              <img src="../../assets/images/uploadImg/music.png">
            </div>音乐
          </div>
        </transition>
      </van-col>
      <van-col span="6">
        <transition name="van-slide-up">
          <div v-show="visible4" @click="toUploadVideo">
            <div class="boder-round">
              <img src="../../assets/images/uploadImg/video.png">
            </div>视频
          </div>
        </transition>
      </van-col>
    </van-row>
    <transition name="van-slide-up">
      <div class="close-icon" v-show="visible5" @click="fifthTypeClose">
        <img src="../../assets/images/uploadImg/close.png">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'uploadPopup',
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false
    }
  },
  mounted() {
    this.firstType()
  },
  methods: {
    firstType() {
      this.visible1 = true
      setTimeout(()=>{
        this.secondType()
      },150)
    },
    secondType() {
      this.visible2 = true
      setTimeout(()=>{
        this.thirdType()
      },150)
    },
    thirdType() {
      this.visible3 = true
      setTimeout(()=>{
        this.fourthType()
      },150)
    },
    fourthType() {
      this.visible4 = true
      setTimeout(()=>{
        this.fifthType()
      },150)
    },
    fifthType() {
      this.visible5 = true
    },
    fifthTypeClose() {
      this.visible5 = false
      setTimeout(()=>{
        this.fourthTypeClose()
      },50)
    },
    fourthTypeClose() {
      this.visible4 = false
      setTimeout(()=>{
        this.thirdTypeClose()
      },50)
    },
    thirdTypeClose() {
      this.visible3 = false
      setTimeout(()=>{
        this.secondTypeClose()
      },50)
    },
    secondTypeClose() {
      this.visible2 = false
      setTimeout(()=>{
        this.firstTypeClose()
      },50)
    },
    firstTypeClose() {
      this.visible1 = false
      setTimeout(()=>{
        this.$router.go(-1)
      },350)
    },
    toUploadArticle() {
      this.$router.push('/uploadArticle')
    },
    toUploadPhoto() {
      this.$router.push('/uploadPhoto')
    },
    toUploadMusic() {
      this.$router.push('/uploadMusic')
    },
    toUploadVideo() {
      this.$router.push('/uploadVideo')
    }
  }
}
</script>

<style lang="less" scoped>
.uploadPopup {
  .four-type-wrap {
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0;
    text-align: center;
    font-size: 12px;
    .boder-round {
      width: 55px;
      height: 55px;
      position: relative;
      border-radius: 50%;
      border: 1px solid rgb(0, 0, 0);
      margin: 0 auto;
      margin-bottom: 5px;
      img {
        width: 28px;
        height: 28px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .close-icon {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
