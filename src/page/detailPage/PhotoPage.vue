<template>
  <div class="photoPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <right-dialog 
      v-show="showDialog" 
      :collectionShow="collectionShow" 
      @collection="onCollection"
      @share="onShare"
      @report="onReport"
    ></right-dialog>
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" @toPage="onOpenDialog"></base-header>
    <div class="main-content"  @click="onCloseDialog">
      <div class="photo-title">{{photo.idea_title}}</div>
      <van-cell class="photo-author" :title="author.username" :label="photo.idea_time" :border="false" center>
        <div class="head-image" slot="icon" @click="toUserCenter">
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
      <div class="photo-content">
        <div class="photo-summary">{{photo.idea_content}}</div>
        <div 
          class="photo-cell-wrap"
          v-for="(photoCell, index) in photoList"
          :key="index"
        >
          <img :src="photoCell" alt="">
        </div>
      </div>
      <div class="photo-foot clearfix">
        <div class="read-number">阅读 {{readNum}}</div>
        <div class="like-number" @click="addLikeNum">
          <img :src="likeStatus">
          <span>{{likeNum}}</span>
        </div>
      </div>
      <div class="gray-block"></div>
      <comment-area :idea_id="idea_id"></comment-area>
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
  name: 'photoPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
      collectionShow: true,
      showDialog: false,
      loadingShow: false,
      showFocus: true,
      photo: {},
      photoList: [],
      idea_id: this.$route.query.photo_id,
      author_id: '',
      author: [],
      likeStatus: require('@/assets/images/like.png'),
      likeNum: 0,
      readNum: 0
    }
  },
  mounted() {
    this.getPhotoDetail()
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
    getPhotoDetail() {
      this.loadingShow = true
      postFindOneIdea({
        _id: this.$route.query.photo_id
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.photo = res.resultList
          this.photoList = this.photo.idea_images
          this.author_id = res.resultList.author_id
          this.likeNum = this.photo.like_num
          this.readNum = this.photo.read_num
          this.readNum++

          //作者信息
          postObtainUserInfo({
            _id: this.author_id
          }).then(res => {
            this.author = res.resultList
          })

          //访问量
          postUpdateReadNum({
            idea_id: this.$route.query.photo_id,
            read_num: this.readNum
          }).then(res => {
            if(res.success) {
            }
          })

          //当作者为用户本身或者已经关注该作者或未登录则隐藏关注按钮
          if(this.author_id == this.$store.state.idData || !this.$store.state.memberData) {
            this.showFocus = false
          }
          for(let i = 0; i < this.$store.state.focusData.length; i++) {
            if(this.author_id == this.$store.state.focusData[i]) {
              this.showFocus = false
            }
          }

          //当作者为用户本身或者已经收藏该作者或未登录则隐藏收藏按钮
          if(this.author_id == this.$store.state.idData || !this.$store.state.memberData) {
            this.collectionShow = false
          }
          for(let i = 0; i < this.$store.state.collectionData.length; i++) {
            if(this.$route.query.photo_id == this.$store.state.collectionData[i]) {
              this.collectionShow = false
            }
          }

          //点赞按钮状态
          for(let i = 0; i < this.photo.like_user.length; i++) {
            if(this.$store.state.idData == this.photo.like_user[i]) {
              this.likeStatus = require('@/assets/images/like2.png')
            }
          }
        }
      })
    },
    toUserCenter() {
      this.$router.push({
        name: 'userCenter',
        query: {
          author_id: this.author_id
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
      if(this.likeStatus == require('@/assets/images/like.png')) {
        this.likeNum++
        this.likeStatus = require('@/assets/images/like2.png')
        postAddLikeUser({
          idea_id: this.$route.query.photo_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      } else {
        this.likeNum--
        this.likeStatus = require('@/assets/images/like.png')
        postReduceLikeUser({
          idea_id: this.$route.query.photo_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      }

      postUpdateLikeNum({
        idea_id: this.$route.query.photo_id,
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
        collection_id: this.$route.query.photo_id
      }).then(res => {
        if(res.success) {
          this.$store.state.collectionData = res.resultList.collection_id
          this.collectionShow = false
          this.$toast('已收藏此作品')
        }
      })
    },
    onShare() {
      this.showDialog = false
      this.$toast('暂未开放')
    },
    onReport() {
      this.showDialog = false
      this.$router.push('/reportPage')
    }
  }
}
</script>

<style lang="less" scoped>
.photoPage {
  .main-content {
    .photo-title {
      padding: 0 15px;
      padding-top: 25px;
      font-size: 25px;
      font-weight: bold;
    }
    .photo-author {
      .head-image {
        width: 40px;
        height: 40px;
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
    .photo-content {
      margin-top: 10px;
      padding: 0 15px;
      .photo-summary {
        font-size: 14px;
        color: #888888;
        margin-bottom: 10px;
      }
      .photo-cell-wrap {
        margin-bottom: 20px;
        border: 2px solid rgb(0, 0, 0);
        box-shadow: 5px 5px 10px #888888;
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .photo-foot {
      margin-top: 30px;
      padding: 0 15px;
      color: rgb(136, 136, 136);
      .read-number {
        float: left;
      }
      .like-number {
        float: right;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
    .clearfix::after {
      content: ".";
      clear: both;
      display: block;
      overflow: hidden;
      font-size: 0;
      height: 0;
    }
    .clearfix {
      zoom: 1;
    }
    .gray-block {
      height: 10px;
      margin-top: 10px;
      background: rgb(240, 240, 240);
    }
  }
}
</style>
