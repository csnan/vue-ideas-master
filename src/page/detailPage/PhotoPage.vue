<template>
  <div class="photoPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <right-dialog v-show="showDialog"></right-dialog>
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" @toPage="onOpenDialog"></base-header>
    <div class="main-content"  @click="onCloseDialog">
      <div class="photo-title">{{photo.idea_title}}</div>
      <van-cell class="photo-author" :title="photo.author" :label="photo.idea_time" :border="false" center>
        <div class="head-image" slot="icon">
          <img :src="photo.author_img">
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
        <div class="read-number">阅读 1215</div>
        <div class="like-number">
          <img src="../../assets/images/like.png">
          <span>121511</span>
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
export default {
  name: 'photoPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
      showDialog: false,
      loadingShow: false,
      showFocus: true,
      photo: {},
      photoList: [],
      idea_id: this.$route.query.photo_id,
      author_id: '',
      author: '',
      author_img: '',
      author_sex: '',
      author_introduction: ''
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
          this.author = res.resultList.author
          this.author_img = res.resultList.author_img
          this.author_sex = res.resultList.author_sex
          this.author_introduction = res.resultList.author_introduction
          if(this.author_id == this.$store.state.idData) {
            this.showFocus = false
          }
          for(let i = 0; i < this.$store.state.focusData.length; i++) {
            if(this.author_id == this.$store.state.focusData[i].focus_id) {
              this.showFocus = false
            }
          }
        }
      })
    },
    onFocus() {
      postAddFocus({
        _id: this.$store.state.idData,
        focus_id: this.author_id,
        focus_username: this.author,
        focus_headImg: this.author_img,
        focus_sex: this.author_sex,
        focus_introduction: this.author_introduction
      }).then(res => {
        if(res.success) {
          this.$store.state.focusData = res.resultList.focus
          this.$store.state.focusNumData = res.resultList.focus.length
          this.showFocus = false
          this.$toast.success('已关注该作者')
        }
      })
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
