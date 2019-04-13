<template>
  <div class="rankingList">
    <base-header :titleTop="titleName" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <div class="radio-top">
        <el-radio-group v-model="checked" size="mini" @change="switchRanking">
          <el-radio-button label="点赞量"></el-radio-button>
          <el-radio-button label="评论量"></el-radio-button>
          <el-radio-button label="阅读量"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="ranking-idea">
        <div class="ranking-idea-content">
          <div 
            class="ranking-idea-cell" 
            v-for="(cellIdea, index) in cellIdeaList"
            :key="index"
            @click="toIdeaPage(cellIdea.type, cellIdea._id)"
          >
            <div class="ranking-num">
              {{index+1}}
            </div>
            <div class="ranking-idea-text">
              <div class="ranking-article-title">{{cellIdea.idea_title}}</div>
              <div class="ranking-idea-summary">{{cellIdea.idea_content}}</div>
              <div class="ranking-idea-foot">
                <div>
                  <img src="../../assets/images/like3.png">
                  <span>{{cellIdea.like_num}}</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>{{cellIdea.comments.length}}</span>
                </div>
                <div>
                  <img src="../../assets/images/look.png">
                  <span>{{cellIdea.read_num}}</span>
                </div>
                <div class="foot-type">
                  <span>{{cellIdea.type | typeFormat}}</span>
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
import { postFindAllIdea } from "@/api/index"
export default {
  name: 'rankingList',
  data() {
    return {
      titleName: '排行榜',
      backIcon: require('@/assets/images/back2.png'),
      checked: '点赞量',
      cellIdeaList: []
    }
  },
  filters: {
    typeFormat: function (type) {
      if(type == 'article') {
        type = '文章'
        return type
      }
      if(type == 'photo') {
        type = '图片'
        return type
      }
      if(type == 'music') {
        type = '音乐'
        return type
      }
      if(type == 'video') {
        type = '视频'
        return type
      }
    }
  },
  mounted() {
    this.getRankingList()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    getRankingList() {
      postFindAllIdea().then(res => {
        if(res.success) {
          this.cellIdeaList = res.resultList
          if(this.cellIdeaList.length > 50) {
            this.cellIdeaList.length = 50
          }
          if(this.checked == '点赞量') {
            let type = 'like_num'
            this.cellIdeaList.sort(this.compare(type));
          }
        }
      })
    },
    switchRanking() {
      let type = ''
      switch(this.checked) {
        case '点赞量':
          type = 'like_num'
          this.cellIdeaList.sort(this.compare(type));
          break;

        case '评论量':
          type = 'comments'
          this.cellIdeaList.sort(this.compare2(type));
          break;

        case '阅读量':
          type = 'read_num'
          this.cellIdeaList.sort(this.compare(type));
          break;
      }
    },
    compare(attr) {
      return function(a,b){
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
      }
    },
    compare2(attr) {
      return function(a,b){
        var val1 = a[attr].length;
        var val2 = b[attr].length;
        return val2 - val1;
      }
    },
    toIdeaPage(type, idea_id) {
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
.rankingList {
  .radio-top {
    padding: 6px 15px;
  }
  .ranking-idea {
    .ranking-idea-content {
      padding: 0px 15px;
      margin-top: -5px;
      .ranking-idea-cell {
        text-align: right;
        height: 115px;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .ranking-num{
          float: left;
          vertical-align: top;
          font-size: 20px;
          font-weight: bold;
          color: red;
        }
        .ranking-idea-text {
          width: 90%;
          display: inline-block;
          .ranking-article-title {
            font-size: 16px;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .ranking-idea-summary {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            text-align: left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .ranking-idea-foot {
            width: 90%;
            position: absolute;
            bottom: 5px;
            text-align: left;
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
            .foot-type {
              float: right;
              margin-right: 0px;
              padding: 0 5px;
              border: 1px solid rgb(246, 131, 12);
              border-radius: 5px;
              span {
                color: rgb(246, 131, 12);
                line-height: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
