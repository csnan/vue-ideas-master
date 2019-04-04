<template>
  <div class="musicList">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header titleTop="音乐" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <div class="recommend-music">
        <van-cell 
          class="recommend-music-header" 
          title="曲散人终离，人散梦已醒" 
          :border="false" 
          center 
        >
          <img src="../../assets/images/lineIcon.png" slot="icon">
        </van-cell>
        <div class="recommend-music-content">
          <div 
            class="recommend-music-cell clearfix"
            v-for="(cellMusic, index) in cellMusicList"
            :key="index"
            @click="toMusicPage(cellMusic._id)"
          >
            <div class="recommend-music-image">
              <img class="music-cover" :src="cellMusic.idea_img">
              <div class="music-cover-icon">
                <img src="../../assets/images/play.png">
              </div>
            </div>
            <div class="recommend-music-text">
              <div class="recommend-music-title">{{cellMusic.idea_title}}</div>
              <div class="recommend-music-summary">{{cellMusic.idea_content}}</div>
              <div class="recommend-music-foot">
                <div>
                  <img src="../../assets/images/play2.png">
                  <span>123</span>
                </div>
                <div>
                  <img src="../../assets/images/comment.png">
                  <span>123</span>
                </div>
                <div class="foot-time">
                  <span>{{cellMusic.idea_time}}</span>
                </div>
              </div>
              <div class="recommend-music-author">
                <div>
                  <img :src="cellMusic.author_img">
                </div>
                <span>{{cellMusic.author}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindIdeaType } from "@/api/index"
import { postFindArrayIdUser } from "@/api/index"
export default {
  name: 'musicList',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      cellMusicList: [],
    }
  },
  mounted() {
    this.getAllMusic()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    toMusicPage(music_id) {
      this.$router.push({
        name: 'musicPage',
        query: {
          music_id: music_id
        }
      })
    },
    getAllMusic() {
      this.loadingShow = true
      postFindIdeaType({
        type: 'music'
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.cellMusicList = res.resultList.reverse()
          let author_ids = []
          for(let i = 0; i < this.cellMusicList.length; i++) {
            author_ids.push(this.cellMusicList[i].author_id)
          }
          postFindArrayIdUser({
            _ids: author_ids
          }).then(res => {
            if(res.success) {
              let authorList = res.resultList
              for(let i = 0; i < this.cellMusicList.length; i++) {
                for(let j = 0; j < authorList.length; j++) {
                  if(this.cellMusicList[i].author_id == authorList[j]._id) {
                    this.cellMusicList[i].author = authorList[j].username
                    this.cellMusicList[i].author_img = authorList[j].headImg
                  }
                }
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.musicList {
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
            width: 120%;
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
            .foot-time {
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
}
</style>