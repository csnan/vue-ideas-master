<template>
  <div class="loadingImage">
    <div class="loading-img" v-if="loadingShow">
      <van-loading type="spinner" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadingImage',
  props: {
    loadingShow: {
      type: Boolean
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.loadingImage {
  .loading-img {
    position: fixed;
    padding: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
  }
}
</style>
