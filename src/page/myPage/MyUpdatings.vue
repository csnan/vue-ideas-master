<template>
  <div class="myUpdatings">
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
        <div class="home-cell-bottom-content">{{cell.idea_title}}</div>
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
            <span>123</span>
          </van-col>
          <van-col span="6">
            <img src="../../assets/images/like.png">
            <span>123</span>
          </van-col>
          <van-col class="foot-more" span="6">
            <van-icon 
              name="ellipsis" 
              color="rgb(180, 180, 180)"
              @click="onPopup(index)"
            />
          </van-col>
        </van-row>
      </div>
      <van-popup v-model="cell.showPopup"> 
        <van-cell-group>
          <!-- <van-cell title="不再看到此条微博" @click="onDelete(index)"/>
          <van-cell title="减少此人的微博" />
          <van-cell title="标题党、假新闻" />
          <van-cell title="投诉" /> -->
          <van-cell 
          v-for="(cellPopup, indexPopup) in cellPopupList"
          :key="indexPopup"
          :title="cellPopup"
          @click="onHandItem(index, indexPopup)"
          />
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { postFindAuthorIdea } from "@/api/index"
export default {
  name: 'myUpdatings',
  data() {
    return {
      cellListCircle: [],
      cellPopupList: [
        '不再看到此条微博',
        '减少此人的微博',
        '标题党、假新闻',
        '投诉'
      ]
    }
  },
  mounted() {
    this.getAuthorIdea()
  },
  methods: {
    getAuthorIdea() {
      postFindAuthorIdea({
        author_id: this.$store.state.idData
      }).then(res => {
        this.cellListCircle = res.resultList.reverse()
        for(let i = 0; i < this.cellListCircle.length; i++){
          if(this.cellListCircle[i].type == 'photo') {
            this.cellListCircle[i].idea_img = this.cellListCircle[i].idea_images[0]
          }
        }
      })
    },
    onPopup(index) {
      this.cellListCircle[index].showPopup = true
    },
    onHandItem(index, indexPopup) {
      if(indexPopup == 0) {
        this.cellListCircle.splice(index, 1)
      }
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
  .home-first-cell-wrap {
    margin-bottom: 10px;
    .home-cell-top {
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
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
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
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
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
<style lang="less">
.myUpdatings{
  .van-popup {
    width: 80%;
    border-radius: 10px;
  }
  .van-cell__value {
    text-align: left;
  }
}
</style>
