<template>
  <div class="aboutPage">
    <base-header :leftLogo="false" :leftIcon="backIcon" @goBack="toBack"></base-header>
    <div class="main-content">
      <div class="about-content">
        <div class="thanks-text">感谢您的使用！</div>
        <div class="my-info">
          <div>学校：广州大学华软软件学院</div>
          <div>学号：1540624138</div>
          <div>姓名：蔡思楠</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png')
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.aboutPage {
  .main-content {
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .about-content {
      width: 80%;
      position: absolute;
      top: 30%;
      left: 80%;
      transform: translate(-80%, -30%);
      .thanks-text {
        font-size: 25px;
        font-weight: bold;
      }
      .my-info {
        margin-top: 20px;
        margin-left: 20px;
      }
    }
  }
}
</style>
