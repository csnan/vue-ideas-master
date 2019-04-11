<template>
  <div class="collectionPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header 
      :titleTop="titleTop" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <div class="recommend-collection">
        <div class="recommend-collection-content">
          <div 
            class="recommend-collection-cell" 
            v-for="(cellCollection, index) in cellCollectionList"
            :key="index"
            @click="toDetailPage(cellCollection.type, cellCollection._id)"
          >
            <div class="recommend-collection-text">
              <div class="recommend-article-title">{{cellCollection.idea_title}}</div>
              <div class="recommend-collection-summary">{{cellCollection.idea_content}}</div>
              <div class="recommend-collection-foot">
                <div>
                  <img src="../../assets/images/like3.png">
                  <span>{{cellCollection.like_num}}</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>{{cellCollection.comments.length}}</span>
                </div>
                <div>
                  <img src="../../assets/images/look.png">
                  <span>{{cellCollection.read_num}}</span>
                </div>
                <div class="foot-right" @click.stop="onDelete(cellCollection._id)">
                  <img src="../../assets/images/close.png">
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
import { postFindArrayIdea } from "@/api/index"
import { postDelCollection } from "@/api/index"
export default {
  name: 'collectionPage',
  data() {
    return {
      titleTop: '',
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      cellCollectionList: [],
      collectionNum: 0
    }
  },
  mounted() {
    this.getCollectionIdea()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    getCollectionIdea() {
      postFindArrayIdea({
        _ids: this.$store.state.collectionData
      }).then(res => {
        if(res.success) {
          this.cellCollectionList = res.resultList
          this.collectionNum = this.cellCollectionList.length
          this.titleTop = '收藏' + '（' + this.collectionNum + ')'
        }
      })
    },
    onDelete(collection_id) {
      this.$dialog.confirm({
        title: '确定删除吗'
      }).then(() => {
        postDelCollection({
          user_id: this.$store.state.idData,
          collection_id: collection_id
        }).then(res => {
          if(res.success) {
            this.$store.state.collectionData = res.resultList.collection_id
            this.getCollectionIdea()
            this.$toast('已删除')
          }
        })
      }).catch(() => {
      });
    },
    toDetailPage(type, idea_id) {
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
.collectionPage {
  .noSearch-icon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    div {
      font-size: 20px;
      font-weight: bold;
      color: rgb(202, 202, 202);
    }
  }
  .recommend-collection {
    .recommend-collection-content {
      padding: 0px 15px;
      margin-top: -5px;
      .recommend-collection-cell {
        height: 115px;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .recommend-collection-text {
          width: 100%;
          display: inline-block;
          .recommend-article-title {
            font-size: 16px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-collection-summary {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .recommend-collection-foot {
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
            .foot-right {
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
