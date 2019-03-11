<template>
  <div class="index">
    <van-tabbar v-model="active" :z-index="99" >
      <van-tabbar-item to="/home">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? homeIcon.active : homeIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/found">
        <span>发现</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? foundIcon.active : foundIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item></van-tabbar-item>
      <van-tabbar-item to="/news">
        <span>消息</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? newsIcon.active : newsIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? myIcon.active : myIcon.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
    <div class="add-button" @click="toUploadPopup">
      <img src="../assets/images/edit.png" width="40">
    </div>
    <router-view> 
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      homeIcon: {
        normal: require('@/assets/images/bottomNav/home1.png'),
        active: require('@/assets/images/bottomNav/home2.png')
      },
      foundIcon: {
        normal: require('@/assets/images/bottomNav/found1.png'),
        active: require('@/assets/images/bottomNav/found2.png')
      },
      newsIcon: {
        normal: require('@/assets/images/bottomNav/news1.png'),
        active: require('@/assets/images/bottomNav/news2.png')
      },
      myIcon: {
        normal: require('@/assets/images/bottomNav/my1.png'),
        active: require('@/assets/images/bottomNav/my2.png')
      }
    }
  },
  mounted() {
    //使每一次刷新页面都会使页面路由和导航相匹配
    if(this.$route.path == "/home") {
      this.active = 0
    }
    if(this.$route.path == "/found") {
      this.active = 1
    }
    if(this.$route.path == "/news") {
      this.active = 3
    }
    if(this.$route.path == "/my") {
      this.active = 4
    }
  },
  methods: {
    toUploadPopup() {
      this.$router.push('/uploadPopup')
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .van-tabbar-item--active {
    color: @base-color;
  }
  .add-button {
    position: fixed;
    margin: 0 auto;
    bottom: 10px;
    left: 0;
    right: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 8px solid rgb(255, 255, 255);
    box-shadow: 0px -1px 1px #b9b9b9;
    background: #FFF;
    z-index: 999;
  }
  //水波纹效果
  .add-button::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }
  .add-button:active::after {
    transform: scale(0, 0);
    opacity: .3;
    //设置初始状态
    transition: 0s;
  }
}
</style>
