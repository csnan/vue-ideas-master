<template>
  <div class="setPage">
    <base-header 
      titleTop="设置" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <van-cell-group>
        <van-cell title="版本更新" value="已是最新版本" label="1.1.1" />
        <van-cell title="给IDEAS评分" is-link/>
        <van-cell title="关于我们" is-link/>
      </van-cell-group>
      <div class="quit-button-box" v-show="showQuit">
        <van-button @click="onQuit">退出当前账号</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      showQuit: false
    }
  },
  mounted() {
    if(this.$store.state.memberData) {
      this.showQuit = true
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onQuit() {
      this.$store.commit('quitMemberData')
      this.$router.push('/my')
    }
  }
}
</script>

<style lang="less" scoped>
.setPage {
  .main-content {
    .quit-button-box{
      padding: 15px;
      .van-button {
        width: 100%;
        background-color: rgba(231, 85, 27, 0.8);
        color: rgb(255, 255, 255);
        letter-spacing: 1px;
        font-size: 15px;
        box-shadow: 0px 2px 10px #bbbbbb;
        border: none;
      }
    }
  }
}
</style>
