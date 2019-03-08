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
      <van-cell class="recommend-article-header" title="推荐美文" :border="false" center is-link>
        <img src="../../assets/images/lineIcon.png" slot="icon">
      </van-cell>
      <div class="recommend-article-content">
        <div 
        class="recommend-article-cell" 
        v-for="(cellArticle, index) in cellArticleList"
        :key="index"
        @click="toArticlePage"
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
    <div class="recommend-photo">
      <van-cell class="recommend-photo-header" title="推荐图集" :border="false" center is-link>
        <img src="../../assets/images/lineIcon.png" slot="icon">
      </van-cell>
      <div class="recommend-photo-content">
        <div 
        class="recommend-photo-cell" 
        v-for="(cellPhoto, index) in cellPhotoList"
        :key="index"
        >
          <div class="recommend-photo-text">{{cellPhoto.title}}</div>
          <van-row class="recommend-photo-image" gutter="5">
            <van-col span="8">
              <div class="recommend-photo-image-box">
                <img :src="cellPhoto.img[0]">
              </div>
            </van-col>
            <van-col span="8">
              <div class="recommend-photo-image-box">
                <img :src="cellPhoto.img[1]">
              </div>
            </van-col>
            <van-col span="8">
              <div class="recommend-photo-image-box">
                <img :src="cellPhoto.img[2]">
              </div>
            </van-col>
          </van-row>
          <div class="recommend-photo-foot">
            <div>
              <img src="../../assets/images/like3.png">
              <span>{{cellPhoto.likeNum}}</span>
            </div>
            <div>
              <img src="../../assets/images/comment.png">
              <span>{{cellPhoto.commentNum}}</span>
            </div>
            <div>
              <img src="../../assets/images/look.png">
              <span>{{cellPhoto.focusNum}}</span>
            </div>
            <div class="close-icon">
              <img src="../../assets/images/close.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-music">
      <van-cell 
        class="recommend-music-header" 
        title="推荐歌曲" 
        :border="false" 
        center 
        is-link
      >
        <img src="../../assets/images/lineIcon.png" slot="icon">
      </van-cell>
      <div class="recommend-music-content">
        <div 
          class="recommend-music-cell clearfix"
          v-for="(cellMusic, index) in cellMusicList"
          :key="index"
        >
          <div class="recommend-music-image">
            <img class="music-cover" :src="cellMusic.coverImg">
            <div class="music-cover-icon">
              <img src="../../assets/images/play.png">
            </div>
          </div>
          <div class="recommend-music-text">
            <div class="recommend-music-title">{{cellMusic.title}}</div>
            <div class="recommend-music-summary">{{cellMusic.content}}</div>
            <div class="recommend-music-foot">
              <div>
                <img src="../../assets/images/play2.png">
                <span>123</span>
              </div>
              <div>
                <img src="../../assets/images/comment.png">
                <span>123</span>
              </div>
            </div>
            <div class="recommend-music-author">
              <div>
                <img :src="cellMusic.headImg">
              </div>
              <span>OKOer</span>
            </div>
          </div>
          <div class="close-icon">
            <img src="../../assets/images/close.png">
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-video">
      <van-cell 
        class="recommend-video-header" 
        title="推荐视频" 
        :border="false" 
        center 
        is-link
      >
        <img src="../../assets/images/lineIcon.png" slot="icon">
      </van-cell>
      <div class="recommend-video-content">
        <div 
        v-for="(cellVideo, index) in cellVideoList"
        :key="index"
        :class="(index + 1) % 2==0?'recommend-video-cell-noright':'recommend-video-cell'"
        @click="toVideoPage"
        >
          <div class="recommend-video-image">
            <img class="video-cover" :src="cellVideo.coverImg">
            <div class="video-cover-icon">
              <img src="../../assets/images/video2.png">
              <span>{{cellVideo.playNum}}</span>
            </div>
            <div class="video-cover-time">{{cellVideo.time}}</div>
          </div>
          <div class="recommend-video-text">
            <div class="recommend-video-title">{{cellVideo.title}}</div>
            <div class="recommend-video-name">{{cellVideo.name}}</div>
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
      ],
      cellPhotoList: [
        {
          title: '风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻',
          img: [
            require('@/assets/images/1.jpeg'),
            require('@/assets/images/1.jpeg'),
            require('@/assets/images/1.jpeg')
          ],
          likeNum: 123,
          commentNum: 123,
          focusNum: 123
        },
        {
          title: '风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻风云变幻',
          img: [
            require('@/assets/images/1.jpeg'),
            require('@/assets/images/1.jpeg'),
            require('@/assets/images/1.jpeg')
          ],
          likeNum: 123,
          commentNum: 123,
          focusNum: 123
        }
      ],
      cellMusicList: [
        {
          title: '浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶',
          content: '永远变换不定的世界浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶',
          playNum: '123',
          commentNum: '123',
          coverImg: require('@/assets/images/1.jpeg'),
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer'
        },
        {
          title: '浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶',
          content: '永远变换不定的世界浪人琵琶浪人琵琶浪人琵琶浪人琵琶浪人琵琶',
          playNum: '123',
          commentNum: '123',
          coverImg: require('@/assets/images/1.jpeg'),
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer'
        }
      ],
      cellVideoList: [
        {
          coverImg: require('@/assets/images/1.jpeg'),
          playNum: '1234',
          time: '03:00',
          title: '浪人琵琶是哈哈哈哈哈的方法的方法的方法',
          name: 'sadsads'
        },
        {
          coverImg: require('@/assets/images/1.jpeg'),
          playNum: '1234',
          time: '03:00',
          title: '浪人琵琶是哈哈哈哈哈的方法的方法的方法',
          name: 'sadsads'
        },
        {
          coverImg: require('@/assets/images/1.jpeg'),
          playNum: '1234',
          time: '03:00',
          title: '浪人琵琶是哈哈哈哈哈的方法的方法的方法',
          name: 'sadsads'
        },
        {
          coverImg: require('@/assets/images/1.jpeg'),
          playNum: '1234',
          time: '03:00',
          title: '浪人琵琶是哈哈哈哈哈的方法的方法的方法',
          name: 'sadsads'
        },
      ]
    }
  },
  methods: {
    toArticlePage() {
      this.$router.push('/articlePage')
    },
    toVideoPage() {
      this.$router.push('/videoPage')
    }
  }
}
</script>

<style lang="less" scoped>
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
            .close-icon {
              float: right;
              margin-right: -3px;
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
  .recommend-photo {
    .recommend-photo-header {
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      img {
        width: 10px;
        height: 18px;
        margin-right: 5px;
      }
    }
    .recommend-photo-content {
      padding: 0px 15px;
      .recommend-photo-cell {
        padding-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .recommend-photo-text {
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .recommend-photo-image {
          margin-top: 8px;
          .recommend-photo-image-box {
            width: 100%;
            height: 80px;
            position: relative;
            margin: 0 auto;
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
        .recommend-photo-foot {
          margin-top: 5px;
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
          .close-icon {
            float: right;
            margin-right: -3px;
          }
        }
      }
    }
  }
  .recommend-music {
    .recommend-music-header {
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      img {
        width: 10px;
        height: 18px;
        margin-right: 5px;
      }
    }
    .recommend-music-content {
      padding: 0px 15px;
      .recommend-music-cell {
        position: relative;
        padding-top: 10px;
        .recommend-music-image {
          width: 34%;
          height: 110px;
          float: left;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          .music-cover {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .music-cover-icon {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50px;
            background: rgba(66, 65, 65, 0.5);
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
        .recommend-music-text {
          width: 64%;
          margin-top: 4px;
          float: right;
          .recommend-music-title {
            font-size: 16px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-music-summary {
            margin-top: 6px;
            font-size: 12px;
            color: rgb(133, 133, 133);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-music-foot {
            padding-bottom: 2px;
            border-bottom: 1px solid rgb(240, 240, 240);
            div {
              display: inline-block;
              margin-right: 10px;
            }
            img {
              width: 10px;
              height: 10px;
              vertical-align: middle;
            }
            span {
              font-size: 10px;
              color: rgb(128, 128, 128);
              vertical-align: middle;
            }
            .close-icon {
              float: right;
              margin-right: -3px;
            }
          }
          .recommend-music-author {
            margin-top: 5px;
            div {
              width: 30px;
              height: 30px;
              position: relative;
              display: inline-block;
              vertical-align: middle;
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
            span {
              font-size: 12px;
            }
          }
        }
        .close-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
      .clearfix::after {
          content: ".";
          clear: both;
          display: block;
          overflow: hidden;
          font-size: 0;
          height: 0;
      }
      .clearfix {
        zoom: 1;
      }
    }
  }
  .recommend-video {
    .recommend-video-header {
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      img {
        width: 10px;
        height: 18px;
        margin-right: 5px;
      }
    }
    .recommend-video-content {
      padding: 10px 15px;
      .recommend-video-cell {
        width: 49%;
        display: inline-block;
        padding-bottom: 5px;
        .recommend-video-image {
          width: 100%;
          height: 100px;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          .video-cover {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .video-cover-icon {
            position: absolute;
            right: 5px;
            img {
              width: 13px;
              height: 13px;
              vertical-align: middle;
            }
            span {
              font-size: 12px;
              color: #fff;
            }
          }
          .video-cover-time {
            position: absolute;
            left: 5px;
            bottom: 3px;
            font-size: 12px;
            color: #fff;
          }
        }
        .recommend-video-text {
          margin-top: 5px;
          .recommend-video-title {
            font-size: 14px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-video-name {
            font-size: 12px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            color: rgb(128, 128, 128);
          }
        }
      }
      .recommend-video-cell-noright {
        width: 49%;
        float: right;
        padding-bottom: 5px;
        .recommend-video-image {
          width: 100%;
          height: 100px;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          .video-cover {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .video-cover-icon {
            position: absolute;
            right: 5px;
            img {
              width: 13px;
              height: 13px;
              vertical-align: middle;
            }
            span {
              font-size: 12px;
              color: #fff;
            }
          }
          .video-cover-time {
            position: absolute;
            left: 5px;
            bottom: 3px;
            font-size: 12px;
            color: #fff;
          }
        }
        .recommend-video-text {
          margin-top: 5px;
          .recommend-video-title {
            font-size: 14px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .recommend-video-name {
            font-size: 12px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            color: rgb(128, 128, 128);
          }
        }
      }
    }
  }
}
</style>