<template>
  <div class="commentArea">
    <div class="comment-wrap">
      <div class="comment-header">
        <img class="line-icon" src="../assets/images/lineIcon.png">评论
        <span>（{{commentNum}}）</span>
        <img class="comment-icon" src="../assets/images/comment.png" @click="openCommentBox">
      </div>
      <div class="comment-edit clearfix" v-show="showCommentBox">
        <van-cell-group>
          <van-field
            v-model="commentContent"
            type="textarea"
            placeholder="请输入评论"
            rows="3"
            autosize
          />
        </van-cell-group>
        <el-button class="comment-push-botton" size="small" type="primary" @click="onPush">
          <img src="../assets/images/send.png" alt="">
          <span>发布</span>
        </el-button>
      </div>
      <div 
        class="comment-cell"
        v-for="(commentCell, index) in commentList"
        :key="index"
      >
        <div class="comment-author clearfix">
          <div class="comment-author-left">
            <div class="head-image" slot="icon">
              <img :src="commentCell.comment_headImg">
            </div>
            <div class="head-text">
              <div class="text-author">{{commentCell.comment_name}}</div>
              <div class="text-time">{{commentCell.comment_time}}</div>
            </div>
          </div>
          <div class="comment-author-right">
            <img class="right-Icon" :src="likeIcon">
            <span>{{commentCell.comment_like}}</span>
          </div>
        </div>
        <div class="comment-content">
          {{commentCell.comment_content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeToStr } from '@/utils/date'
import { postAddComment } from "@/api/index"
import { postFindOneIdea } from "@/api/index"
export default {
  name: 'commentArea',
  props: {
    idea_id: String
  },
  data() {
    return {
      showCommentBox: false,
      commentNum: 0,
      likeIcon: require('@/assets/images/like3.png'),
      commentContent: '',
      commentList: [],
      currentDate: ''
    }
  },
  mounted() {
    this.updateComment()
  },
  methods: {
    openCommentBox() {
      this.showCommentBox = !this.showCommentBox
    },
    updateComment() {
      postFindOneIdea({
        _id: this.idea_id,
      }).then(res => {
        if(res.success) {
          this.commentNum = res.resultList.comments.length
          this.commentList = res.resultList.comments.reverse()
          this.getCommentNum()
        }
      })
    },
    getCommentNum() {
      this.$emit('commentNum', this.commentNum)
    },
    onPush() {
      if(this.commentContent == '') {
        this.$toast('评论内容不能为空')
      } else {
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        postAddComment({
          idea_id: this.idea_id,
          comment_name: this.$store.state.usernameData,
          comment_headImg: this.$store.state.headImgData,
          comment_time: this.currentDate,
          comment_content: this.commentContent
        }).then(res => {
          this.commentContent = ''
          this.showCommentBox = false
          this.updateComment()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.commentArea {
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
  .comment-wrap {
    .comment-header {
      height: 40px;
      padding: 0 15px;
      background: rgb(252, 252, 252);
      line-height: 40px;
      font-weight: bold;
      .line-icon {
        width: 10px;
        height: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
      span {
        color: rgb(136, 136, 136);
        font-weight: normal;
      }
      .comment-icon {
        width: 20px;
        height: 20px;
        float: right;
        margin-top: 12px;
      }
    }
    .comment-edit {
      margin-bottom: 20px;
      .comment-push-botton {
        float: right;
        margin-top: 10px;
        margin-right: 15px;
        background: @base-color;
        border-color: @base-color;
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
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
