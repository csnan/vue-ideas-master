<template>
  <div class="videoList">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header titleTop="视频" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <div class="recommend-video">
        <van-cell 
          class="recommend-video-header" 
          title="人生就像一场无法回放的电影" 
          :border="false" 
          center 
        >
          <img src="../../assets/images/lineIcon.png" slot="icon">
        </van-cell>
        <div class="recommend-video-content">
          <div 
          v-for="(cellVideo, index) in cellVideoList"
          :key="index"
          :class="(index + 1) % 2==0?'recommend-video-cell-noright':'recommend-video-cell'"
          @click="toVideoPage(cellVideo._id)"
          >
            <div class="recommend-video-image">
              <img class="video-cover" :src="cellVideo.idea_img">
              <div class="video-cover-icon">
                <img src="../../assets/images/video2.png">
                <span>111</span>
              </div>
              <div class="video-cover-time">{{cellVideo.idea_time}}</div>
            </div>
            <div class="recommend-video-text">
              <div class="recommend-video-title">{{cellVideo.idea_title}}</div>
              <div class="recommend-video-name">{{cellVideo.author}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postFindIdeaType } from "@/api/index"
export default {
  name: 'videoList',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      cellVideoList: []
    }
  },
  mounted() {
    this.getAllVideo()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    toVideoPage(video_id) {
      this.$router.push({
        name: 'videoPage',
        query: {
          video_id: video_id
        }
      })
    },
    getAllVideo() {
      this.loadingShow = true
      postFindIdeaType({
        type: 'video'
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.cellVideoList = res.resultList.reverse()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.videoList {
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