<template>
  <div class="myWorks">
    <div class="recommend-video-content">
        <div 
          v-for="(cell, index) in cellListIdea"
          :key="index"
          :class="(index + 1) % 3==0?'recommend-video-cell-noright':'recommend-video-cell'"
          @click="toDetailPage(cell.type, cell._id)"
        >
          <div class="recommend-video-image">
            <img class="video-cover" :src="cell.idea_img">
            <div class="video-cover-icon"></div>
            <div class="video-tag">{{cell.type | typeFormat}}</div>
          </div>
          <div class="recommend-video-text">
            <div class="recommend-video-title">{{cell.idea_title}}</div>
            <div class="recommend-video-name">111</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { postFindAuthorIdea } from "@/api/index"
export default {
  name: 'myWorks',
  props: ['author_id'],
  data() {
    return {
      cellListIdea: []
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
    this.getAuthorIdea()
  },
  methods: {
    getAuthorIdea() {
      postFindAuthorIdea({
        author_id: this.author_id
      }).then(res => {
        this.cellListIdea = res.resultList.reverse()
        for(let i = 0; i < this.cellListIdea.length; i++){
          if(this.cellListIdea[i].type == 'photo') {
            this.cellListIdea[i].idea_img = this.cellListIdea[i].idea_images[0]
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
.myWorks {
  .recommend-video-content {
    padding: 10px 15px;
    .recommend-video-cell {
      width: 30%;
      display: inline-block;
      margin-right: 5%;
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
          right: 0px;
          width: 0;
          height: 0;
          border-top: 40px solid rgb(124, 151, 169);
          border-left: 40px solid transparent;
        }
        .video-tag {
          position: absolute;
          top: 4px;
          right: 2px;
          font-size: 12px;
          color: #FFF;
          transform: rotate(45deg);
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
      width: 30%;
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
          right: 0px;
          width: 0;
          height: 0;
          border-top: 40px solid rgb(124, 151, 169);
          border-left: 40px solid transparent;
        }
        .video-tag {
          position: absolute;
          top: 4px;
          right: 2px;
          font-size: 12px;
          color: #FFF;
          transform: rotate(45deg);
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
</style>
