<template>
  <div class="news">
    <base-header titleTop="消息" :rightIcon="searchIcon"></base-header>
  </div>
</template>

<script>
import baseHeader from '../components/BaseHeader'
export default {
  name: 'news',
  components: {
    baseHeader
  },
  data() {
    return {
      searchIcon: require('@/assets/images/search.png')
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
</style>
