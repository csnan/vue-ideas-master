<template>
  <div class="found">
    <base-header titleTop="发现" :rightIcon="searchIcon" @toPage="toSearch"></base-header>
    <div class="main-content">
      <div class="found-top-wrap">
        <div class="found-top-block-wrap" @click="toIdeaPage">
          <img :src="bestImg">
          <div class="">每日一精选</div>
        </div>
        <van-row class="found-top-line-wrap">
          <van-col class="found-top-line-content" span="12">
            <div @click="toRankingList">
              <img class="image-content" src="../assets/images/1.jpeg">
              <div class="black-cover"></div>
              <div class="text-content">
                <div>本月最佳</div>
                <div class="text-english">Brilliant</div>
              </div>
              <div class="image-icon"> 
                <img src="../assets/images/foundImg/hot.png">
              </div>
            </div>
          </van-col>
          <van-col class="found-top-line-content" span="12">
            <div @click="toIdeaCompetition">
              <img class="image-content" src="../assets/images/2.jpeg">
              <div class="black-cover"></div>
              <div class="text-content">
                <div>原创大赛</div>
                <div class="text-english">competition</div>
              </div>
              <div class="image-icon"> 
                <img src="../assets/images/foundImg/trophy.png">
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="found-bottom-wrap">
        <van-cell class="found-bottom-header" title="特色专题" :border="false" center>
          <img src="../assets/images/lineIcon.png" slot="icon">
        </van-cell>
        <div class="found-bottom-content">
          <div class="found-bottom-block first-block">
            <span>搞笑</span>
            <img src="../assets/images/foundImg/happy.png">
          </div>
          <div class="found-bottom-block second-block">
            <span>创意</span>
            <img src="../assets/images/foundImg/originality.png">
          </div>
          <div class="found-bottom-block third-block">
            <span>享受</span>
            <img src="../assets/images/foundImg/enjoy.png">
          </div>
          <div class="found-bottom-block fourth-block">
            <span>实用</span>
            <img src="../assets/images/foundImg/practical.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindAllRecommend } from "@/api/index"
export default {
  name: 'found',
  data() {
    return {
      searchIcon: require('@/assets/images/search.png'),
      bestImg: '',
      type: '',
      idea_id: ''
    }
  },
  mounted() {
    this.getBestRecommend()
  },
  methods: {
    getBestRecommend() {
      postFindAllRecommend().then(res => {
        if(res.success) {
          let recommendList = res.resultList[res.resultList.length-1]
          this.type = recommendList.type
          this.idea_id = recommendList._id
          if(recommendList.type == 'photo') {
            this.bestImg = recommendList.idea_images[0]
          } else {
            this.bestImg = recommendList.idea_img
          }
        }
      })
    },
    toSearch() {
      this.$router.push('/search')
    },
    toRankingList() {
      this.$router.push('/rankingList')
    },
    toIdeaCompetition() {
      this.$toast('暂未开放')
    },
    toIdeaPage() {
      if(this.type == 'article') {
        this.$router.push({
          name: 'articlePage',
          query: {
            article_id: this.idea_id
          }
        })
      }
      if(this.type == 'photo') {
        this.$router.push({
          name: 'photoPage',
          query: {
            photo_id: this.idea_id
          }
        })
      }
      if(this.type == 'music') {
        this.$router.push({
          name: 'musicPage',
          query: {
            music_id: this.idea_id
          }
        })
      }
      if(this.type == 'video') {
        this.$router.push({
          name: 'videoPage',
          query: {
            video_id: this.idea_id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.found {
  .main-content {
    .found-top-wrap {
      .found-top-block-wrap {
        height: 160px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        div {
          width: 100%;
          height: 40px;
          position: absolute;
          bottom: 0;
          padding-left: 15px;
          background: rgba(0, 0, 0, 0.3);
          font-size: 18px;
          color: rgb(255, 255, 255);
          line-height: 40px;
        }
      }
      .found-top-line-wrap {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
        .image-content {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .black-cover {
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
        }
        .text-content {
          position: absolute;
          margin-left: 15px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
          color: rgb(255, 255, 255);
          .text-english {
            font-size: 12px;
          }
        }
        .image-icon {
          width: 35px;
          height: 35px;
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .found-top-line-content {
          position: relative;
          height: 100px;
          overflow: hidden;
        }
        
      }
    }
    .found-bottom-wrap {
      .found-bottom-header {
        font-size: 16px;
        font-weight: bold;
        img {
          width: 10px;
          height: 18px;
          margin-right: 5px;
        }
      }
      .found-bottom-content {
        margin-top: 10px;
        padding: 0 15px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        background: url('../assets/images/bg.png') no-repeat 0px -100px;
        background-size: 100%; 
        .found-bottom-block {
          width: 32%;
          height: 0;
          position: relative;
          padding-bottom: 30%;
          margin-bottom: 10px;
          span {
            margin-left: 5px;
            font-size: 16px;
            color: #FFF;
          }
          img {
            width: 60px;
            height: 60px;
            position: absolute;
            top: 60%;
            left: 60%;
            transform: translate(-50%, -50%);
          }
        }
        .first-block {
          background: rgba(252, 107, 104, 0.5);
        }
        .second-block {
          background: rgba(2, 161, 226, 0.5);
        }
        .third-block {
          background: rgba(255, 153, 0, 0.5);
        }
        .fourth-block {
          background: rgba(154, 239, 86, 0.5);
        }
      }
    }
  }
}
</style>
