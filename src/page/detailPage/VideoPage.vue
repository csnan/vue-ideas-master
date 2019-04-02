<template>
  <div class="videoPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <right-dialog v-show="showDialog"></right-dialog>
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" @toPage="onOpenDialog"></base-header>
    <div class="main-content" @click="onCloseDialog">
      <video
        class="video-source"
        :src="video.idea_file"
        width="100%"
        height="200"
        controls="controls" 
        preload="auto" 
        :poster="video.idea_img" 
        x5-video-player-fullscreen="true" 
        webkit-playsinline="true" 
        x-webkit-airplay="true" 
        playsinline="true" 
        x5-playsinline 
      ></video>
      <div class="video-title">
        {{video.idea_title}}
        <van-icon :class="[rotate?'down-icon-rotate':'down-icon']" name="arrow-down" color="gray" @click="onRotate"/>
      </div>
      <van-cell class="video-author" :title="video.author" :border="false" center>
        <div class="head-image" slot="icon">
          <img :src="video.author_img">
        </div>
        <van-button 
          class="focus-button" 
          v-show="showFocus"
          slot="right-icon" 
          size="small" 
          type="primary"
          @click="onFocus()" 
          plain
        >+ 关注</van-button>
      </van-cell>
      <div class="video-detail">
        <span>1142次播放</span>
        <span>{{video.idea_time}}</span>
        <transition name="van-fade">
          <div v-show="visible">{{video.idea_content}}</div>
        </transition>
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
      <comment-area :idea_id="idea_id"></comment-area>
    </div>
  </div>
</template>

<script>
import { postFindOneIdea } from "@/api/index"
import { postAddFocus } from "@/api/index"
export default {
  name: 'videoPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
      showDialog: false,
      loadingShow: false,
      showFocus: true,
      rotate: false,
      visible: false,
      video: {},
      idea_id: this.$route.query.video_id,
      author_id: ''
    }
  },
  mounted() {
    this.getVideoDetail()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onOpenDialog() {
      this.showDialog = !this.showDialog
    },
    onCloseDialog() {
      this.showDialog = false
    },
    //实现点击旋转图标180度以及出现简介内容
    onRotate() {
      this.rotate = !this.rotate
      this.visible = !this.visible
    },
    getVideoDetail() {
      this.loadingShow = true
      postFindOneIdea({
        _id: this.$route.query.video_id
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.video = res.resultList
          this.author_id = res.resultList.author_id
          if(this.author_id == this.$store.state.idData) {
            this.showFocus = false
          }
          for(let i = 0; i < this.$store.state.focusData.length; i++) {
            if(this.author_id == this.$store.state.focusData[i]) {
              this.showFocus = false
            }
          }
        }
      })
    },
    onFocus() {
      postAddFocus({
        _id: this.$store.state.idData,
        focus_id: this.author_id
      }).then(res => {
        if(res.success) {
          this.$store.state.focusData = res.resultList.focus_id
          this.$store.state.focusNumData = res.resultList.focus_id.length
          this.showFocus = false
          this.$toast.success('已关注该作者')
        }
      })
    }
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
      .down-icon {
        vertical-align: top;
        float: right;
        transition: all 0.5s;
      }
      .down-icon-rotate {
        vertical-align: top;
        float: right;
        transform:rotate(-180deg);
        transition: all 0.5s;
      }
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
      div {
        margin-top: 5px;
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

