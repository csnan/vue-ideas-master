<template>
  <div class="ratePage">
    <base-header :leftLogo="false" :leftIcon="backIcon" :rightIcon="completeIcon"  @goBack="toBack" @toPage="onPush"></base-header>
    <div class="main-content">
      <div class="rate-content">
        <div>给IDEAS评分</div>
        <van-rate v-model="value" :size="40" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratePage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      value: 3
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onPush() {
      this.$toast('超感谢！！！')
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.ratePage {
  .main-content {
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .rate-content {
      width: 100%;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -30%);
      text-align: center;
      div {
        margin-bottom: 30px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
