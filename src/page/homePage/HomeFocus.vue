<template>
  <div class="homeFocus">
    <div 
      :class="index == 0 ? 'home-first-cell-wrap':'home-cell-wrap'"
      v-for="(cell, index) in cellListCircle"
      :key="index"
       @click="toDetailPage(cell.type, cell._id)"
    >
      <van-cell class="home-cell-top" :title="cell.author" :label="cell.idea_time" :border="false" center>
        <div class="head-image" slot="icon">
          <img :src="cell.author_img">
        </div>
      </van-cell>
      <div class="home-cell-bottom">
        <div class="home-cell-bottom-content">{{cell.idea_content}}</div>
        <div class="home-cell-bottom-image">
          <img :src="cell.idea_img">
        </div>
        <van-row class="home-cell-bottom-foot">
          <van-col span="8">
            <img src="../../assets/images/share.png">
            <span>111</span>
          </van-col>
          <van-col span="8">
            <img src="../../assets/images/comment2.png">
            <span>{{cell.comments.length}}</span>
          </van-col>
          <van-col span="8">
            <img src="../../assets/images/like2.png">
            <span>{{cell.like_num}}</span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindArrayIdIdea } from "@/api/index"
import { postFindArrayIdUser } from "@/api/index"
export default {
  name: 'homeFocus',
  data() {
    return {
      cellListCircle: []
    }
  },
  mounted() {
    this.findFocusIdea()
  },
  methods: {
    findFocusIdea() {
      postFindArrayIdIdea({
        _ids: this.$store.state.focusData
      }).then(res => {
        if(res.success) {
          this.cellListCircle = res.resultList.reverse()
          let author_ids = []
          for(let i = 0; i < this.cellListCircle.length; i++) {
            author_ids.push(this.cellListCircle[i].author_id)
          }
          postFindArrayIdUser({
            _ids: author_ids
          }).then(res => {
            if(res.success) {
              let authorList = res.resultList
              for(let i = 0; i < this.cellListCircle.length; i++) {
                for(let j = 0; j < authorList.length; j++) {
                  if(this.cellListCircle[i].author_id == authorList[j]._id) {
                    this.cellListCircle[i].author = authorList[j].username
                    this.cellListCircle[i].author_img = authorList[j].headImg
                  }
                }
              }
            }
          })
          for(let i = 0; i < this.cellListCircle.length; i++){
            if(this.cellListCircle[i].type == 'photo') {
              this.cellListCircle[i].idea_img = this.cellListCircle[i].idea_images[0]
            }
          }
        }
      })
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
.homeFocus {
  .home-first-cell-wrap {
    margin-bottom: 10px;
    .home-cell-top {
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
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .home-cell-bottom-image {
        width: 100%;
        height: 120px;
        position: relative;
        margin-top: 8px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .home-cell-bottom-foot {
        margin-top: 10px;
        font-size: 12px;
        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          color: rgb(100, 100, 100);
        }
      }
    }
  }
  .home-cell-wrap {
    margin-bottom: 10px;
    border-top: 6px solid rgb(240, 240, 240);
    .home-cell-top {
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
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .home-cell-bottom-image {
        width: 100%;
        height: 120px;
        position: relative;
        margin-top: 8px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .home-cell-bottom-foot {
        margin-top: 10px;
        font-size: 12px;
        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          color: rgb(100, 100, 100);
        }
      }
    }
  }
}
</style>