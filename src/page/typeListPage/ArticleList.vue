<template>
  <div class="articleList">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header titleTop="文章" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <div class="recommend-article">
        <van-cell class="recommend-article-header" title="读懂清风朗月，自然恬淡" :border="false" center>
          <img src="../../assets/images/lineIcon.png" slot="icon">
        </van-cell>
        <div class="recommend-article-content">
          <div 
          class="recommend-article-cell" 
          v-for="(cellArticle, index) in cellArticleList"
          :key="index"
          @click="toArticlePage(cellArticle._id)"
          >
            <div class="recommend-article-text">
              <span>{{cellArticle.idea_title}}</span>
              <div class="recommend-article-summary">{{cellArticle.idea_content}}</div>
              <div class="recommend-article-foot">
                <div>
                  <img src="../../assets/images/like3.png">
                  <span>111</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>111</span>
                </div>
                <div>
                  <img src="../../assets/images/look.png">
                  <span>111</span>
                </div>
                <div class="foot-time">
                  <span>{{cellArticle.idea_time}}</span>
                </div>
              </div>
            </div>
            <div class="recommend-article-image">
              <img :src="cellArticle.idea_img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindIdeaType } from "@/api/index"
export default {
  name: 'articleList',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      cellArticleList: [],
    }
  },
  mounted() {
    this.getAllArticle()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    toArticlePage(article_id) {
      this.$router.push({
        name: 'articlePage',
        query: {
          article_id: article_id
        }
      })
    },
    getAllArticle() {
      this.loadingShow = true
      postFindIdeaType({
        type: 'article'
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.cellArticleList = res.resultList.reverse()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.articleList {
  .recommend-article {
    .recommend-article-header {
      font-size: 16px;
      font-weight: bold;
      img {
        width: 10px;
        height: 18px;
        margin-right: 5px;
      }
    }
    .recommend-article-content {
      padding: 0px 15px;
      margin-top: -5px;
      .recommend-article-cell {
        height: 115px;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .recommend-article-text {
          width: 70%;
          display: inline-block;
          span {
            font-size: 16px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-article-summary {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .recommend-article-foot {
            width: 100%;
            position: absolute;
            bottom: 5px;
            div {
              display: inline-block;
              margin-right: 10px;
            }
            img {
              width: 10px;
              height: 10px;
              margin-right: 3px;
              vertical-align: middle;
            }
            span {
              font-size: 10px;
              color: rgb(128, 128, 128);
              vertical-align: middle;
            }
            .foot-time {
              float: right;
              margin-right: 0px;
            }
          }
        }
        .recommend-article-image {
          width: 27%;
          height: 85px;
          position: relative;
          float: right;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
