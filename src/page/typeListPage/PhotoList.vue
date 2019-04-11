<template>
  <div class="photoList">
    <loading-image :loadingShow="loadingShow"></loading-image>
    <base-header titleTop="图片" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <div class="recommend-photo">
        <van-cell class="recommend-photo-header" title="你所看到的世界，只是你选择看到的样子" :border="false" center>
          <img src="../../assets/images/lineIcon.png" slot="icon">
        </van-cell>
        <div class="recommend-photo-content">
          <div 
          class="recommend-photo-cell" 
          v-for="(cellPhoto, index) in cellPhotoList"
          :key="index"
          @click="toPhotoPage(cellPhoto._id)"
          >
            <div class="recommend-photo-text">{{cellPhoto.idea_title}}</div>
            <van-row class="recommend-photo-image" gutter="5">
              <van-col span="8">
                <div class="recommend-photo-image-box">
                  <img :src="cellPhoto.idea_images[0]">
                </div>
              </van-col>
              <van-col span="8">
                <div class="recommend-photo-image-box">
                  <img :src="cellPhoto.idea_images[1]">
                </div>
              </van-col>
              <van-col span="8">
                <div class="recommend-photo-image-box">
                  <img :src="cellPhoto.idea_images[2]">
                </div>
              </van-col>
            </van-row>
            <div class="recommend-photo-foot">
              <div>
                <img src="../../assets/images/like3.png">
                <span>{{cellPhoto.like_num}}</span>
              </div>
              <div>
                <img src="../../assets/images/comment.png">
                <span>{{cellPhoto.comments.length}}</span>
              </div>
              <div>
                <img src="../../assets/images/look.png">
                <span>{{cellPhoto.read_num}}</span>
              </div>
              <div class="foot-time">
                <span>{{cellPhoto.idea_time}}</span>
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
export default {
  name: 'photoList',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      loadingShow: false,
      cellPhotoList: [],
    }
  },
  mounted() {
    this.getAllPhoto()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    toPhotoPage(photo_id) {
      this.$router.push({
        name: 'photoPage',
        query: {
          photo_id: photo_id
        }
      })
    },
    getAllPhoto() {
      this.loadingShow = true
      postFindIdeaType({
        type: 'photo'
      }).then(res => {
        if(res.success) {
          this.loadingShow = false
          this.cellPhotoList = res.resultList.reverse()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.photoList {
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
              width: 120%;
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
          .foot-time {
            float: right;
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>