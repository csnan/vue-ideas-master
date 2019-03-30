<template>
  <div class="chatPage">
    <base-header :titleTop="titleName" :leftLogo="false" :leftIcon="backIcon" :rightIcon="moreIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatPage',
  data() {
    return {
      titleName: 'OKOer',
      backIcon: require('@/assets/images/back2.png'),
      moreIcon: require('@/assets/images/more.png'),
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
</style>
