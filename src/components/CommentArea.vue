<template>
  <div class="commentArea">
    <div class="comment-wrap">
      <div class="comment-header">
        <img src="../assets/images/lineIcon.png">评论
        <span>（2011）</span>
      </div>
      <div 
      class="comment-cell"
      v-for="(commentCell, index) in commentList"
      :key="index"
      >
        <div class="comment-author clearfix">
          <div class="comment-author-left">
            <div class="head-image" slot="icon">
              <img :src="commentCell.headImg">
            </div>
            <div class="head-text">
              <div class="text-author">{{commentCell.name}}</div>
              <div class="text-time">{{commentCell.time}}</div>
            </div>
          </div>
          <div class="comment-author-right">
            <img class="right-Icon" src="../assets/images/like3.png">
            <span>{{commentCell.likeNum}}</span>
          </div>
        </div>
        <div class="comment-content">
          {{commentCell.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentArea',
  props: {
    commentList: Array
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.commentArea {
  .comment-wrap {
    .comment-header {
      height: 40px;
      padding: 0 15px;
      background: rgb(252, 252, 252);
      line-height: 40px;
      font-weight: bold;
      img {
        width: 10px;
        height: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
      span {
        color: rgb(136, 136, 136);
        font-weight: normal;
      }
    }
    .comment-cell {
      padding: 20px 15px 15px 15px;
      border-top: 1px solid rgb(240, 240, 240);
      .comment-author {
        .comment-author-left {
          float: left;
          .head-image {
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
          .head-text {
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
            .text-author {
              font-size: 14px;
            }
            .text-time {
              font-size: 10px;
              color: rgb(136, 136, 136);
            }
          }
        }
        .comment-author-right {
          float: right;
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          span {
            font-size: 13px;
            color: rgb(136, 136, 136);
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
      .comment-content {
        margin-top: 10px;
        line-height: 20px;
        letter-spacing: 2px;
        color: rgb(80, 50, 50);
      }
    }
  }
}
</style>
