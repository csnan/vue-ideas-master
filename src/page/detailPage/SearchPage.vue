<template>
  <div class="searchPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header 
      titleTop="搜索内容" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <nothing-image :showNoSearch="showNoSearch"></nothing-image>
      <div class="recommend-history">
        <div class="recommend-history-content">
          <div 
          class="recommend-history-cell" 
          v-for="(cellHistory, index) in cellHistoryList"
          :key="index"
          @click="toHistoryPage(cellHistory.type, cellHistory._id)"
          >
            <div class="recommend-history-text">
              <div class="recommend-article-title">{{cellHistory.idea_title}}</div>
              <div class="recommend-history-summary">{{cellHistory.idea_content}}</div>
              <div class="recommend-history-foot">
                <div>
                  <img src="../../assets/images/like3.png">
                  <span>{{cellHistory.like_num}}</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>{{cellHistory.comments.length}}</span>
                </div>
                <div>
                  <img src="../../assets/images/look.png">
                  <span>{{cellHistory.read_num}}</span>
                </div>
                <div class="foot-time">
                  <span>{{cellHistory.idea_time}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindIdeaName } from "@/api/index"
export default {
  name: 'searchPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      showNoSearch: false,
      cellHistoryList: []
    }
  },
  mounted() {
    this.findIdeaName()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    findIdeaName() {
      this.loadingShow = true
      //通过标题进行模糊搜索
      postFindIdeaName({
        idea_title: this.$route.query.idea_title
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.cellHistoryList = res.resultList.reverse()
          if(this.cellHistoryList.length == 0) {
            this.showNoSearch = true
          }
        }
      })
    },
    toHistoryPage(type, idea_id) {
      if(type == 'article') {
        this.$router.push({
          name: 'articlePage',
          query: {
            article_id: idea_id
          }
        })
      }
      if(type == 'photo') {
        this.$router.push({
          name: 'photoPage',
          query: {
            photo_id: idea_id
          }
        })
      }
      if(type == 'music') {
        this.$router.push({
          name: 'musicPage',
          query: {
            music_id: idea_id
          }
        })
      }
      if(type == 'video') {
        this.$router.push({
          name: 'videoPage',
          query: {
            video_id: idea_id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchPage {
  .recommend-history {
    .recommend-history-content {
      padding: 0px 15px;
      margin-top: -5px;
      .recommend-history-cell {
        height: 115px;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .recommend-history-text {
          width: 100%;
          display: inline-block;
          .recommend-article-title {
            font-size: 16px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-history-summary {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .recommend-history-foot {
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
      }
    }
  }
}
</style>
