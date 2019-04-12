<template>
  <div class="myUpdatings">
    <van-loading class="loading-image" v-if="loadingShow" type="spinner" />
    <div class="nothing-tag" v-if="showNoSearch">这个人很懒，什么都没有~</div>
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
          <van-col span="6">
            <img src="../../assets/images/share.png">
            <span>123</span>
          </van-col>
          <van-col span="6">
            <img src="../../assets/images/comment2.png">
            <span>{{cell.comments.length}}</span>
          </van-col>
          <van-col span="6">
            <img src="../../assets/images/like2.png">
            <span>{{cell.like_num}}</span>
          </van-col>
          <van-col class="foot-more" span="6">
            <img src="../../assets/images/close.png" alt="" @click.stop="onDelete(cell._id)">
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindAuthorIdea } from "@/api/index"
import { postFindArrayIdUser } from "@/api/index"
import { postDelIdea } from "@/api/index"
export default {
  name: 'myUpdatings',
  props: ['author_id'],
  data() {
    return {
      loadingShow: false,
      showNoSearch: false,
      cellListCircle: []
    }
  },
  mounted() {
    this.getAuthorIdea()
  },
  methods: {
    getAuthorIdea() {
      this.loadingShow = true
      postFindAuthorIdea({
        author_id: this.author_id
      }).then(res => {
        this.loadingShow = false
        this.cellListCircle = res.resultList.reverse()
        if(this.cellListCircle.length == 0) {
          this.showNoSearch = true
        }
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
      })
    },
    onDelete(idea_id) {
      this.$dialog.confirm({
        title: '确定删除此动态吗'
      }).then(() => {
        postDelIdea({
          idea_id: idea_id
        }).then(res => {
          if(res.status == 'ok') {
            this.getAuthorIdea()
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
.myUpdatings {
  .loading-image {
    margin: 0 auto;
  }
  .nothing-tag {
    margin-top: 50px;
    text-align: center;
    font-size: 16px;
    color: rgb(202, 202, 202);
  }
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
        .foot-more {
          text-align: right;
        }
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
        .foot-more {
          text-align: right;
        }
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
