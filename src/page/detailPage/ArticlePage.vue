<template>
  <div class="articlePage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <right-dialog v-show="showDialog" :collectionShow="collectionShow" @collection="onCollection"></right-dialog>
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" @toPage="onOpenDialog"></base-header>
    <div class="main-content" @click="onCloseDialog"> 
      <div class="article-title">{{article.idea_title}}</div>
      <van-cell class="article-author" :title="author.username" :label="article.idea_time" :border="false" center>
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
      <div class="article-content">{{article.idea_content}}</div>
      <div class="article-foot clearfix">
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
  name: 'articlePage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
      collectionShow: true,
      showDialog: false,
      loadingShow: false,
      showFocus: true,
      article: {},
      idea_id: this.$route.query.article_id,
      author_id: '',
      author: [],
      likeStatus: require('@/assets/images/like.png'),
      likeNum: 0,
      readNum: 0
    }
  },
  mounted() {
    this.getArticleDetail()
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
    getArticleDetail() {
      this.loadingShow = true
      postFindOneIdea({
        _id: this.$route.query.article_id
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.article = res.resultList
          this.author_id = res.resultList.author_id
          this.likeNum = this.article.like_num
          this.readNum = this.article.read_num
          this.readNum++

          //作者信息
          postObtainUserInfo({
            _id: this.author_id
          }).then(res => {
            this.author = res.resultList
          })

          //访问量
          postUpdateReadNum({
            idea_id: this.$route.query.article_id,
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
            if(this.$route.query.article_id == this.$store.state.collectionData[i]) {
              this.collectionShow = false
            }
          }

          //点赞按钮状态
          for(let i = 0; i < this.article.like_user.length; i++) {
            if(this.$store.state.idData == this.article.like_user[i]) {
              this.likeStatus = require('@/assets/images/like2.png')
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
      if(this.likeStatus == require('@/assets/images/like.png')) {
        this.likeNum++
        this.likeStatus = require('@/assets/images/like2.png')
        postAddLikeUser({
          idea_id: this.$route.query.article_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      } else {
        this.likeNum--
        this.likeStatus = require('@/assets/images/like.png')
        postReduceLikeUser({
          idea_id: this.$route.query.article_id,
          like_user: this.$store.state.idData
        }).then(res => {
          if(res.success) {
          }
        })
      }

      postUpdateLikeNum({
        idea_id: this.$route.query.article_id,
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
        collection_id: this.$route.query.article_id
      }).then(res => {
        if(res.success) {
          this.$store.state.collectionData = res.resultList.collection_id
          this.collectionShow = false
          this.$toast('已收藏此作品')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.articlePage {
  .main-content {
    .article-title {
      padding: 0 15px;
      padding-top: 25px;
      font-size: 25px;
      font-weight: bold;
    }
    .article-author {
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
    .article-content {
      margin-top: 10px;
      padding: 0 15px;
      font-size: 17px;
      line-height: 28px;
      letter-spacing: 2px;
    }
    .article-foot {
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
