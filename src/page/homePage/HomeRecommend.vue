<template>
  <div class="homeRecommend">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(imgSwipe, index) in imgSwipes" :key="index">
        <img :src="imgSwipe" class="img-swipe"/>
      </van-swipe-item>
    </van-swipe>
    <van-row class="four-type">
      <van-col span="6">
        <div class="color-round1">
          <img src="../../assets/images/article.png">
        </div>文章
      </van-col>
      <van-col span="6">
        <div class="color-round2">
          <img src="../../assets/images/photo.png">
        </div>图片
      </van-col>
      <van-col span="6">
        <div class="color-round3">
          <img src="../../assets/images/music.png">
        </div>音乐
      </van-col>
      <van-col span="6">
        <div class="color-round4">
          <img src="../../assets/images/video.png">
        </div>视频
      </van-col>
    </van-row>
    <div class="recommend-article">
      <van-cell class="recommend-article-header" title="推荐文章" :border="false" center is-link>
        <img src="../../assets/images/lineIcon.png" slot="icon">
      </van-cell>
      <div class="recommend-article-content">
        <div 
        class="recommend-article-cell" 
        v-for="(cellArticle, index) in cellArticleList"
        :key="index"
        >
          <div class="recommend-article-text">
            <span>{{cellArticle.title}}</span>
            <div class="recommend-article-summary">{{cellArticle.content}}</div>
            <div class="recommend-article-foot">
              <div>
                <img src="../../assets/images/like3.png">
                <span>{{cellArticle.likeNum}}</span>
              </div>
              <div>
                <img src="../../assets/images/comment.png">
                <span>{{cellArticle.commentNum}}</span>
              </div>
              <div>
                <img src="../../assets/images/look.png">
                <span>{{cellArticle.focusNum}}</span>
              </div>
              <div class="close-icon">
                <img src="../../assets/images/close.png">
              </div>
            </div>
          </div>
          <div class="recommend-article-image">
            <img :src="cellArticle.img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeRecommend',
  data() {
    return {
      imgSwipes: [
        require('@/assets/images/moveImg/1.png'),
        require('@/assets/images/moveImg/2.png'),
        require('@/assets/images/moveImg/3.png'),
        require('@/assets/images/moveImg/4.png')
      ],
      cellArticleList: [
        {
          title: '《寻梦环游记》正确的生死',
          content: '电影《寻梦环游记》中，在亡灵世界里，被遗忘的人们将会面临第二次死亡，猪电影寻梦环游记中，在亡影寻梦环游记中，在亡',
          img: require('@/assets/images/1.jpeg'),
          likeNum: 123,
          commentNum: 123,
          focusNum: 123
        },
        {
          title: '《寻梦环游记》正确的生死',
          content: '电影《寻梦环游记》中，在亡灵世界里，被遗忘的人们将会面临第二次死亡，猪电影寻梦环游记中，在亡影寻梦环游记中，在亡',
          img: require('@/assets/images/1.jpeg'),
          likeNum: 123,
          commentNum: 123,
          focusNum: 123
        }
      ]
    }
  }
}
</script>

<style lang="less">
.homeRecommend {
  .img-swipe {
    width: 100%;
  }
  .four-type {
    width: 85%;
    margin: 10px auto;
    text-align: center;
    font-size: 12px;
    img {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .color-round1 {
      width: 40px;
      height: 40px;
      position: relative;
      border-radius: 50%;
      background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);
      box-shadow: 0px 0px 20px rgba(206, 206, 206, 0.5);
      margin: 0 auto;
      margin-bottom: 8px;
    }
    .color-round2 {
      width: 40px;
      height: 40px;
      position: relative;
      border-radius: 50%;
      background-image: linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%);
      box-shadow: 0px 0px 20px rgba(206, 206, 206, 0.5);
      margin: 0 auto;
      margin-bottom: 8px;
    }
    .color-round3 {
      width: 40px;
      height: 40px;
      position: relative;
      border-radius: 50%;
      background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
      box-shadow: 0px 0px 20px rgba(206, 206, 206, 0.5);
      margin: 0 auto;
      margin-bottom: 8px;
    }
    .color-round4 {
      width: 40px;
      height: 40px;
      position: relative;
      border-radius: 50%;
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      box-shadow: 0px 0px 20px rgba(206, 206, 206, 0.5);      
      margin: 0 auto;
      margin-bottom: 8px;
    }
  }
  .recommend-article {
    .recommend-article-header {
      font-size: 16px;
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
        height: 110px;
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
              vertical-align: middle;
            }
            .close-icon {
              float: right;
              margin-right: -3px;
            }
          }
        }
        .recommend-article-image {
          width: 27%;
          height: 80%;
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