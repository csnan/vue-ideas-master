<template>
  <div class="baseHeader">
    <van-nav-bar 
      :title="titleTop" 
      :border="false" 
      :style="headerBox" 
      :z-index="99" 
      fixed
    >
      <img src="../assets/images/logo.png" slot="left" v-show="leftLogo" class="logo-img">
      <img :src="leftIcon" slot="left" class="left-icon" @click="toBack">
      <img :src="rightIcon" slot="right" class="right-icon" @click="toRouter">
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'baseHeader',
  props: {
    titleTop: {
      type: String
    }, 
    leftLogo: {
      type: Boolean,
      default: true
    }, 
    leftIcon: {
      type: String
    }, 
    rightIcon: {
      type: String
    },
    bgColor: {
      type: String,
      default: '#1BBEE7'
    },
    fontColor: {
      type: String,
      default: 'rgb(255, 255, 255)'
    }
  },
  data() {
    return {
      headerBox: {
        backgroundColor: this.bgColor,
        color: this.fontColor
      }
    }
  },
  methods: {
    toBack() {
      this.$emit('goBack')
    },
    toRouter() {
      this.$emit('toPage')
    }
  },
  watch: {
    bgColor(val) {
      this.headerBox.backgroundColor = val
    }
  }
}
</script>

<style lang="less" scoped>
.baseHeader {
  .logo-img {
    width: 50px;
    vertical-align: middle;
  }
  .left-icon {
    width: 20px;
    vertical-align: middle;
  }
  .right-icon {
    width: 20px;
    vertical-align: middle;
  }
}
</style>
