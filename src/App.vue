<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  //监听滚动条，使每一次刷新或者切换页面都会使滚动条回到顶部
  watch: {
    '$route': function(to,from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style>
</style>
