<template>
  <div class="footprintPage">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header 
      :titleTop="titleTop" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <nothing-image :showNoSearch="showNoSearch"></nothing-image>
      <div class="recommend-footprint">
        <div class="recommend-footprint-content">
          <div 
            class="recommend-footprint-cell" 
            v-for="(cellFootprint, index) in cellFootprintList"
            :key="index"
            @click="toDetailPage(cellFootprint.type, cellFootprint._id)"
          >
            <div class="recommend-footprint-text">
              <div class="recommend-article-title">{{cellFootprint.idea_title}}</div>
              <div class="recommend-footprint-summary">{{cellFootprint.idea_content}}</div>
              <div class="recommend-footprint-foot">
                <div>
                  <img src="../../assets/images/like3.png">
                  <span>{{cellFootprint.like_num}}</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>{{cellFootprint.comments.length}}</span>
                </div>
                <div>
                  <img src="../../assets/images/look.png">
                  <span>{{cellFootprint.read_num}}</span>
                </div>
                <div class="foot-right" @click.stop="onDelete(cellFootprint._id)">
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
import { postDelFootprint } from "@/api/index"
export default {
  name: 'footprintPage',
  data() {
    return {
      titleTop: '足迹（0）',
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      showNoSearch: false,
      cellFootprintList: [],
      footprintNum: 0
    }
  },
  mounted() {
    this.getFootprintIdea()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    getFootprintIdea() {
      if(!this.$store.state.memberData) {
        this.showNoSearch = true
      } else {
        this.loadingShow = true
        postFindArrayIdea({
          _ids: this.$store.state.footprintData
        }).then(res => {
          if(res.success) {
            this.loadingShow = false
            this.cellFootprintList = res.resultList
            this.footprintNum = this.cellFootprintList.length
            this.titleTop = '足迹' + '（' + this.footprintNum + '）'
            if(this.cellFootprintList.length == 0) {
              this.showNoSearch = true
            }
          }
        })
      }
    },
    onDelete(footprint_id) {
      this.$dialog.confirm({
        title: '确定删除吗'
      }).then(() => {
        postDelFootprint({
          user_id: this.$store.state.idData,
          footprint_id: footprint_id
        }).then(res => {
          if(res.success) {
            this.$store.state.footprintData = res.resultList.footprint_id
            this.getFootprintIdea()
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
.footprintPage {
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
  .recommend-footprint {
    .recommend-footprint-content {
      padding: 0px 15px;
      margin-top: -5px;
      .recommend-footprint-cell {
        height: 115px;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .recommend-footprint-text {
          width: 100%;
          display: inline-block;
          .recommend-article-title {
            font-size: 16px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-footprint-summary {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .recommend-footprint-foot {
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
