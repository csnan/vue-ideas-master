<template>
  <div class="nothingImage">
    <div class="noSearch-icon" v-if="showNoSearch">
      <img src="../assets/images/noSearch.png" alt="">
      <div>呜呜呜啥都没有~</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nothingImage',
  props: {
    showNoSearch: {
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
.nothingImage {
  .noSearch-icon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    div {
      font-size: 20px;
      font-weight: bold;
      color: rgb(202, 202, 202);
    }
  }
}
</style>
