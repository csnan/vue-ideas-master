<template>
  <div class="chatPage2">
    <base-header :titleTop="titleName" :leftLogo="false" :leftIcon="backIcon" @goBack="toBack" ></base-header>
    <div class="main-content">

      <div class="opposite-user">
        <div class="chat-detail">
          <div class="head-image">
            <img src="../../assets/images/2.jpeg" alt="">
          </div>
          <div class="chat-content">
            <div class="triangle-box"></div>
            你好啊
          </div>
        </div>
        <div class="chat-detail">
          <div class="head-image">
            <img src="../../assets/images/2.jpeg" alt="">
          </div>
          <div class="chat-content">
            <div class="triangle-box"></div>
            很高兴能看到你的作品
          </div>
        </div>
        <div class="chat-detail">
          <div class="head-image">
            <img src="../../assets/images/2.jpeg" alt="">
          </div>
          <div class="chat-content">
            <div class="triangle-box"></div>
            希望你能一直更新去，期待你的下个作品
          </div>
        </div>
      </div>

      <div class="self-user">
        <div class="chat-detail" v-for="(cell, index) in chatValueList" :key="index">
          <div class="chat-content">
            <div class="triangle-box"></div>
            {{cell}}
          </div>
          <div class="head-image">
            <img src="../../assets/images/1.jpeg" alt="">
          </div>
        </div>
      </div>

      <div class="chat-wrap">
        <div class="emoji-box" @click="openEmoji">
          <img src="../../assets/images/emoji.png" alt="">
        </div>
        <van-search
          class="chat-box"
          v-model="chatValue"
          placeholder="说点什么吧..."
          shape="round"
          @search="onSend"
          show-action
        >
          <div slot="action" @click="onSend">发送</div>
        </van-search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatPage2',
  data() {
    return {
      titleName: '贝贝',
      backIcon: require('@/assets/images/back2.png'),
      chatValue: '',
      chatValueList: []
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    openEmoji() {
      this.$toast('暂未开放')
    },
    onSend() {
      this.chatValueList.push(this.chatValue)
      this.chatValue = ''
    }
  }
}
</script>

<style lang="less" scoped>
.chatPage2 {
  .main-content {
    .opposite-user {
      padding: 15px;
      padding-bottom: 0;
      .chat-detail {
        margin-bottom: 20px;
        .head-image {
          width: 45px;
          height: 45px;
          display: inline-block;
          position: relative;
          border-radius: 50px;
          overflow: hidden;
          img {
            width: 120%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .chat-content {
          max-width: 65%;
          display: inline-block;
          margin-left: 10px;
          vertical-align: top;
          padding: 12px;
          word-wrap: break-word;
          border-radius: 5px;
          background: rgb(240, 240, 240);
          .triangle-box{
            width:0;
            height:0;
            position: absolute;
            margin-left: -20px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 10px solid rgb(240, 240, 240);
          }
        }
      }
    }
    .self-user {
      padding: 0 15px;
      .chat-detail {
        margin-bottom: 20px;
        text-align: right;
        .head-image {
          width: 45px;
          height: 45px;
          display: inline-block;
          position: relative;
          border-radius: 50px;
          overflow: hidden;
          img {
            width: 120%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .chat-content {
          max-width: 65%;
          display: inline-block;
          position: relative;
          margin-right: 10px;
          vertical-align: top;
          padding: 12px;
          word-wrap: break-word;
          border-radius: 5px;
          text-align: left;
          background: rgb(126, 202, 238);
          .triangle-box{
            width:0;
            height:0;
            position: absolute;
            right: -8px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 10px solid rgb(126, 202, 238);
          }
        }
      }
    }
    .chat-wrap {
      width: 100%;
      height: 44px;
      position: fixed;
      bottom: 0;
      background: rgb(242, 242, 242);
      .emoji-box {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .chat-box {
        width: 85%;
        position: absolute;
        right: 8px;
      }
    }
  }
}
</style>
<style lang="less">
.chatPage2 {
  .van-icon, .van-icon::before {
    display: none;
  }
  .van-search {
    padding: 7px 0;
  }
}
</style>

