<template>
  <div class="videoPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <right-dialog v-show="showDialog" :collectionShow="collectionShow" @collection="onCollection"></right-dialog>
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
      <van-cell class="video-author" :title="author.username" :border="false" center>
        <div class="head-image" slot="icon">
          <img :src="author.headImg">
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
        <van-col span="8">
          <div @click="addLikeNum">
            <img :src="likeStatus">
          </div>{{likeNum}}
        </van-col>
        <!-- <van-col span="6">
          <div>
            <img src="../../assets/images/collection2.png">
          </div>5645
        </van-col> -->
        <van-col span="8">
          <div>
            <img src="../../assets/images/comment3.png">
          </div>{{commentNum}}
        </van-col>
        <van-col span="8">
          <div>
            <img src="../../assets/images/share2.png">
          </div>{{readNum}}
        </van-col>
      </van-row>
      <div class="gray-block"></div>
      <comment-area :idea_id="idea_id" @commentNum="getCommentNum"></comment-area>
    </div>
  </div>
</template>

<script>
import { postFindOneIdea } from "@/api/index"
import { postAddFocus } from "@/api/index"
import { postObtainUserInfo } from "@/api/index"
import { postUpdateLikeNum } from "@/api/index"
import { postAddLikeUser } from "@/api/index"
import { postReduceLikeUser } from "@/api/index"
import { postAddCollection } from "@/api/index"
import { postUpdateReadNum } from "@/api/index"
export default {
  name: 'videoPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
      collectionShow: true,
      showDialog: false,
      loadingShow: false,
      showFocus: true,
      rotate: false,
      visible: false,
      video: {},
      idea_id: this.$route.query.video_id,
      author_id: '',
      author: [],
      commentNum: 0,
      likeStatus: require('@/assets/images/like4.png'),
      likeNum: 0,
      readNum: 0
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
          this.likeNum = this.video.like_num
          this.readNum = this.video.read_num
          this.readNum++

          //作者信息
          postObtainUserInfo({
            _id: this.author_id
          }).then(res => {
            this.author = res.resultList
          })

          //访问量
          postUpdateReadNum({
            idea_id: this.$route.query.video_id,
            read_num: this.readNum
          }).then(res => {
            if(res.success) {
            }
          })

          //当作者为用户本身或者已经关注该作者则隐藏关注按钮
          if(this.author_id == this.$store.state.idData) {
            this.showFocus = false
          }
          for(let i = 0; i < this.$store.state.focusData.length; i++) {
            if(this.author_id == this.$store.state.focusData[i]) {
              this.showFocus = false
            }
          }

          //当作者为用户本身或者已经收藏该作者则隐藏收藏按钮
          if(this.author_id == this.$store.state.idData) {
            this.collectionShow = false
          }
          for(let i = 0; i < this.$store.state.collectionData.length; i++) {
            if(this.$route.query.video_id == this.$store.state.collectionData[i]) {
              this.collectionShow = false
            }
          }

          //点赞按钮状态
          for(let i = 0; i < this.video.like_user.length; i++) {
            if(this.$store.state.idData == this.video.like_user[i]) {
              this.likeStatus = require('@/assets/images/like44.png')
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
    },
    addLikeNum() {
      if(this.likeStatus == require('@/assets/images/like4.png')) {
        this.likeNum++
        this.likeStatus = require('@/assets/images/like44.png')
        postAddLikeUser({
          idea_id: this.$route.query.video_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      } else {
        this.likeNum--
        this.likeStatus = require('@/assets/images/like4.png')
        postReduceLikeUser({
          idea_id: this.$route.query.video_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      }

      postUpdateLikeNum({
        idea_id: this.$route.query.video_id,
        like_num: this.likeNum
      }).then(res => {
        if(res.success) {
        }
      })

    },
    onCollection() {
      this.showDialog = false
      postAddCollection({
        user_id: this.$store.state.idData,
        collection_id: this.$route.query.video_id
      }).then(res => {
        if(res.success) {
          this.$store.state.collectionData = res.resultList.collection_id
          this.collectionShow = false
          this.$toast('已收藏此作品')
        }
      })
    },
    getCommentNum(data) {
      this.commentNum = data
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
        position: relative;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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

