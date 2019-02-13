<template>
  <div class="focus">
    <base-header :rightIcon="addFriendIcon"></base-header>
    <div class="tab-box">
      <div
       class="tab-item"
       v-for="(tab, index) in tabs"
       :key="index"
       @click="onTabsSwitch(index)"
       v-bind:class="{active:index==nowTabIndex}"
      >{{tab}}</div>
    </div>
    <div class="main-content">
      <div class="tab-first" v-show="nowTabIndex===0">11111</div>
      <div class="tab-second" v-show="nowTabIndex===1">22222</div>
    </div>
  </div>
</template>

<script>
import baseHeader from '../components/BaseHeader'
export default {
  name: 'focus',
  components: {
    baseHeader
  },
  data() {
    return {
      addFriendIcon: require('@/assets/images/addFriend.png'),
      nowTabIndex: 0,
      tabs: ["我关注","关注我"],
    }
  },
  methods: {
    onTabsSwitch(index) {
      this.nowTabIndex = index
    },
  }
}
</script>

<style lang="less" scoped>
.focus {
  .tab-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 50%;
    height: 45px;
    z-index: 999;
    .tab-item{
      width: 50%;
      height: 43px;
      line-height: 50px;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      color: rgb(173, 218, 255);
    }
    .tab-item.active {
      width: 50%;
      height: 43px;
      line-height: 50px;
      display: inline-block;
      text-align: center;
      border-bottom: 2px solid rgb(255, 255, 255);
      font-size: 14px;
      color: #FFF;
    }
  }
}
</style>
