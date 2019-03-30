<template>
  <div class="rightDialog">
    <div class="dialog-box">
      <div class="dialog-content">
        <img src="../assets/images/dialogImg/collection.png" alt="">
        <span>收藏</span>
      </div>
      <div class="dialog-content">
        <img src="../assets/images/dialogImg/share.png" alt="">
        <span>分享</span>
      </div>
      <div class="dialog-content">
        <img src="../assets/images/dialogImg/bell.png" alt="">
        <span>举报</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightDialog',
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.rightDialog {
  .dialog-box {
    width: 150px;
    position: fixed;
    top: 40px;
    right: 0;
    border-radius: 2px;
    box-shadow: -1px 1px 10px #888888;
    background: rgb(255, 255, 255);
    z-index: 999;
    .dialog-content {
      padding: 10px 0 10px 15px;
      border-bottom: 1px solid rgb(240, 240, 240);
      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        color: #707070;
      }
    }
  }
}
</style>
