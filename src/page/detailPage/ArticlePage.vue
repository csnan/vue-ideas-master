<template>
  <div class="articlePage">
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" ></base-header>
    <div class="main-content"> 
      <div class="article-title">寻梦环游记正确的生死</div>
      <van-cell class="article-author" title="OKOer" label="2019-02-28 11:16" :border="false" center>
        <div class="head-image" slot="icon">
          <img src="../../assets/images/1.jpeg">
        </div>
        <van-button 
          class="focus-button" 
          slot="right-icon" 
          size="small" 
          type="primary"
          @click="onFocus()" 
          plain
        >+ 关注</van-button>
      </van-cell>
      <div class="article-content">
        行书兼有楷书的基本法则和草书流动的笔法，行书运笔虽比草书慢，但比楷书要快，
        而且具有强烈的节奏感。苏轼所言的：“真如立、行如行、草如走”的观点，说明了不同书体形态的不同，
        也说明了书写的速度和节奏的不同。研习楷书时，在笔法上要求建立楷法，即关于起笔、行笔和收笔的各种要求，
        概括地说，起、收须有交待，如藏锋、露锋、回锋、折笔、顿笔等。而行书因为书写的便捷，将楷书行笔中的一些繁杂的笔法进行简化，
        省去了许多逆、回、顿、驻、转等楷书笔法。可是，放松楷法，并非意味着行书书写的容易，在用笔上的要求反而是更高了。
        它要在点画的表现上保持楷书所要达到的或基本遵循的艺术效果，笔画当重处还得重，当轻处还得轻，不能像硬笔写出的那样一般粗细，
        有弯无折。刘熙载《艺概》云：“书家于提按二字，有相合且无相离，故用笔重处正须提正、用笔轻处正须实按，始能免堕、飘二病。”这种功夫要从楷书中来，
        根据楷则进行放松，使行书行笔有节奏。在起笔、收笔时缓些，在中间行笔时快些，而在笔画之间交换过程中，笔势更迅疾些。总之，行笔既要不徐不疾，
        沉着从容；又要有疾有徐，态度自在。
      </div>
      <div class="article-foot clearfix">
        <div class="read-number">阅读 1215</div>
        <div class="like-number">
          <img src="../../assets/images/like.png">
          <span>121511</span>
        </div>
      </div>
      <div class="gray-block"></div>
      <div class="comment-wrap">
        <div class="comment-header">
          <img src="../../assets/images/lineIcon.png">评论
          <span>（2011）</span>
        </div>
        <div class="comment-cell">
          <div class="comment-author clearfix">
            <div class="comment-author-left">
              <div class="head-image" slot="icon">
                <img src="../../assets/images/1.jpeg">
              </div>
              <div class="head-text">
                <div class="text-author">OKOer</div>
                <div class="text-time">2019-02-28 11:16</div>
              </div>
            </div>
            <div class="comment-author-right">
              <img class="right-Icon" src="../../assets/images/like3.png">
              <span>1111</span>
            </div>
          </div>
          <div class="comment-content">
            按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨
          </div>
        </div>

        <div class="comment-cell">
          <div class="comment-author clearfix">
            <div class="comment-author-left">
              <div class="head-image" slot="icon">
                <img src="../../assets/images/1.jpeg">
              </div>
              <div class="head-text">
                <div class="text-author">OKOer</div>
                <div class="text-time">2019-02-28 11:16</div>
              </div>
            </div>
            <div class="comment-author-right">
              <img class="right-Icon" src="../../assets/images/like3.png">
              <span>1111</span>
            </div>
          </div>
          <div class="comment-content">
            按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨按时发生发生范德萨范德萨
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articlePage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png')
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="less" scoped>
.articlePage {
  .main-content {
    .article-title {
      padding: 0 15px;
      padding-top: 25px;
      font-size: 25px;
      font-weight: bold;
    }
    .article-author {
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
      .focus-button {
        border: 1px solid rgb(246, 131, 12);
        color: rgb(246, 131, 12);
      }
    }
    .article-content {
      margin-top: 10px;
      padding: 0 15px;
      font-size: 17px;
      line-height: 28px;
      letter-spacing: 2px;
    }
    .article-foot {
      margin-top: 30px;
      padding: 0 15px;
      color: rgb(136, 136, 136);
      .read-number {
        float: left;
      }
      .like-number {
        float: right;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          vertical-align: middle;
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
    .gray-block {
      height: 10px;
      margin-top: 10px;
      background: rgb(240, 240, 240);
    }
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
        .comment-content {
          margin-top: 10px;
          line-height: 20px;
          letter-spacing: 2px;
          color: rgb(80, 50, 50);
        }
      }
    }
  }
}
</style>
