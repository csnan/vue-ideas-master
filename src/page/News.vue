<template>
  <div class="news">
    <base-header titleTop="消息" :rightIcon="addFriendIcon" @toPage="toAddFriend"></base-header>
    <nothing-image :showNoSearch="showNoSearch"></nothing-image>
    <div v-if="!showNoSearch">
      <div class="tab-box-wrap">
        <div class="tab-box">
          <div
            class="tab-item"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="onTabsSwitch(index)"
            v-bind:class="{active:index==nowTabIndex}"
          >{{tab}}</div>
        </div>
      </div>
      <div class="content-news">
        <div class="tab-first" v-show="nowTabIndex===0">
          <van-swipe-cell 
            v-for="(cell, index) in cellListFirst" 
            :key="index" 
            :right-width="65"
          >
            <van-cell-group>
              <van-cell :title="cell.titleText" :label="cell.labelText" @click="toChatPage(cell.titleText)">
                <div class="head-image" slot="icon">
                  <img :src="cell.headImg">
                </div>
                <div>{{cell.valueText}}</div>
                <van-tag class="tag-number" type="danger" round>{{cell.num}}</van-tag>
              </van-cell>
            </van-cell-group>
            <span slot="right" @click="onDeleteFirst(index)">删除</span>
          </van-swipe-cell>
        </div>
        <div class="tab-second" v-show="nowTabIndex===1">
          <div
            class="cell-warp"
            v-for="(cell, index) in cellListSecond" 
            :key="index"
          >
            <div class="head-image">
              <img :src="cell.headImg">
            </div>
            <div class="text-right">
              <div class="text-name">
                <span class="text-name-main">{{cell.titleText}}</span>
                <span class="text-name-detail">评论了：</span>
                <span class="text-name-detail">{{cell.ideaTitle}}</span>
              </div>
              <div class="text-comment">{{cell.labelText}}</div>
              <div class="text-time">{{cell.valueText}}</div>
              <div class="foot-button">
                <img src="../assets/images/comment.png">
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-third" v-show="nowTabIndex===2">
          <div
            class="cell-warp"
            v-for="(cell, index) in cellListThird" 
            :key="index"
          >
            <div class="head-image">
              <img :src="cell.headImg">
            </div>
            <div class="text-right">
              <div class="text-name">
                <span class="text-name-main">{{cell.titleText}}</span>
                <span class="text-name-detail">赞了：</span>
                <span class="text-name-detail">{{cell.ideaTitle}}</span>
              </div>
              <div class="text-time">{{cell.valueText}}</div>
            </div>
          </div>
        </div>
        <div class="tab-fourth" v-show="nowTabIndex===3">
          <van-swipe-cell 
            v-for="(cell, index) in cellListFourth" 
            :key="index" 
            :right-width="65"
          >
            <van-cell-group>
              <van-cell :title="cell.titleText" :label="cell.labelText">
                <div class="head-image" slot="icon">
                  <img :src="cell.headImg">
                </div>
                <div>{{cell.valueText}}</div>
                <van-tag class="tag-number" type="danger" round>{{cell.num}}</van-tag>
              </van-cell>
            </van-cell-group>
            <span slot="right" @click="onDeleteFourth(index)">删除</span>
          </van-swipe-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data() {
    return {
      addFriendIcon: require('@/assets/images/addFriend.png'),
      showNoSearch: false,
      nowTabIndex: 0,
      tabs: ["私信","评论","赞我","通知"],
      cellListFirst: [
        {
          titleText: '向真', 
          labelText: '你那篇文章真的是太好了，我要做你粉丝！！！',
          valueText: '14:13',
          num: '2',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '贝贝', 
          labelText: '希望你能一直更新去，期待你的下个作品',
          valueText: '15:22',
          num: '3',
          headImg: require('@/assets/images/2.jpeg')
        }
      ],
      cellListSecond: [
        {
          titleText: '向真', 
          labelText: '太好了太感动了呜呜呜',
          valueText: '16:11',
          ideaTitle: '《青春斗》',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '贝贝', 
          labelText: '写的很好，引人入胜',
          valueText: '10:22',
          ideaTitle: '《青春斗》',
          headImg: require('@/assets/images/2.jpeg')
        }
      ],
      cellListThird: [
        {
          titleText: '向真', 
          valueText: '16:11',
          ideaTitle: '《青春斗》',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '贝贝', 
          valueText: '10:22',
          ideaTitle: '《青春斗》',
          headImg: require('@/assets/images/2.jpeg')
        }
      ],
      cellListFourth: [
        {
          titleText: 'IDEAS小秘', 
          labelText: '欢迎加入IDEAS大家庭！！！',
          valueText: '15:00',
          num: '2',
          headImg: require('@/assets/images/custom.png')
        },
        {
          titleText: 'IDEAS官方活动', 
          labelText: '劲爆大奖等你来拿！！！',
          valueText: '10:22',
          num: '6',
          headImg: require('@/assets/images/official.png')
        }
      ]
    }
  },
  mounted() {
    if(!this.$store.state.memberData) {
      this.showNoSearch = true
    }
  },
  methods: {
    onTabsSwitch(index) {
      this.nowTabIndex = index
    },
    onDeleteFirst(index) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.cellListFirst.splice(index, 1)
      }).catch(() => {
      })
    },
    onDeleteFourth(index) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.cellListFourth.splice(index, 1)
      }).catch(() => {
      })
    },
    toChatPage(username) {
      if(username == '向真') {
        this.$router.push('/chatPage')
      } else {
        this.$router.push('/chatPage2')
      }
    },
    toAddFriend() {
      this.$toast('暂未开放')
    }
  },
}
</script>

<style lang="less" scoped>
.news {
  margin-bottom: 68px;
  .tab-box-wrap {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 46px;
    background: url('../assets/images/bg.png') no-repeat 0px -30px;
    background-size: 100%; 
    z-index: 999;
    .tab-box {
      display: flex;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 95%;
      height: 25px;
      border: 1px solid rgb(0, 0, 0);
      border-radius: 50px;
      overflow: hidden;
      .tab-item{
        flex: 1;
        height: 25px;
        line-height: 27px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: rgb(0, 0, 0);
      }
      .tab-item.active {
        flex: 1;
        height: 25px;
        border-radius: 50px;
        line-height: 27px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: rgb(255, 255, 255);
        background: rgba(160, 160, 160, 0.5);
      }
    }
  }
  .content-news {
    margin-top: 86px;
    .tab-first {
      .head-image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .tab-second {
      .cell-warp {
        border-bottom: 1px solid rgb(240, 240, 240);
        padding: 10px 15px;
        .head-image {
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 10px;
          border-radius: 50px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text-right {
          vertical-align: top;
          margin-top: 2px;
          margin-left: -4px;
          .text-name {
            .text-name-main {
              margin-right: 5px;
            }
            .text-name-detail {
              font-size: 14px;
              color: rgb(150, 150, 150);
            }
          }
          .text-comment {
            margin-top: 8px;
            font-size: 12px;
          }
          .text-time {
            display: inline-block;
            font-size: 12px;
            margin-top: 8px;
            color: rgb(150, 150, 150);
          }
          .foot-button {
            float: right;
            img {
              width: 12px;
              height: 12px;
              vertical-align: bottom;
            }
            span {
              font-size: 12px;
              color: rgb(150, 150, 150);
              vertical-align: bottom;
            }
          }
        }
      }
    }
    .tab-third {
      .cell-warp {
        border-bottom: 1px solid rgb(240, 240, 240);
        padding: 10px 15px;
        .head-image {
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 10px;
          border-radius: 50px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text-right {
          vertical-align: top;
          margin-top: 2px;
          margin-left: -4px;
          .text-name {
            .text-name-main {
              margin-right: 5px;
            }
            .text-name-detail {
              font-size: 14px;
              color: rgb(150, 150, 150);
            }
          }
          .text-time {
            display: inline-block;
            font-size: 12px;
            margin-top: 8px;
            color: rgb(150, 150, 150);
          }
        }
      }
    }
    .tab-fourth {
      .head-image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="less">
.news {
  .van-swipe-cell__right {
    display: inline-block;
    width: 65px;
    font-size: 15px;
    line-height: 68px;
    color: #fff;
    text-align: center;
    background-color: #f44;
  }
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__label {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>

