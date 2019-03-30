<template>
  <div class="focusPage">
    <base-header 
      titleTop="关注" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <van-swipe-cell 
        v-for="(cell, index) in cellListFocus" 
        :key="index" 
        :right-width="65"
      >
        <van-cell-group>
          <van-cell :title="cell.focus_username" :label="cell.focus_introduction">
            <div class="head-image" slot="icon">
              <img :src="cell.focus_headImg">
            </div>
            <img class="sex-icon" :src="cell.focus_sex | toImage" alt="">
          </van-cell>
        </van-cell-group>
        <span slot="right" @click="onDeleteFirst(index)">取关</span>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { postObtainUserInfo } from "@/api/index"
export default {
  name: 'focusPage',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      cellListFocus: []
    }
  },
  filters: {
    toImage(focus_sex) {
      if(focus_sex == 'male') {
        focus_sex = require('@/assets/images/male.png')
        return focus_sex
      } else {
        focus_sex = require('@/assets/images/female.png')
        return focus_sex
      }
    }
  },
  mounted() {
    this.getUserFocus()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    getUserFocus() {
      postObtainUserInfo({
        _id: this.$store.state.idData
      }).then(res => {
        if(res.success) {
          this.cellListFocus = res.resultList.focus
        }
      })
    },
    onDeleteFirst(index) {
      this.$dialog.confirm({
        message: '确定取消关注吗？'
      }).then(() => {
        this.cellListFocus.splice(index, 1)
      }).catch(() => {
      })
    },
  }
}
</script>

<style lang="less" scoped>
.focusPage {
  .main-content {
    .head-image {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .sex-icon {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
<style lang="less">
.focusPage {
  .van-swipe-cell__right {
    display: inline-block;
    width: 65px;
    font-size: 15px;
    line-height: 68px;
    color: #fff;
    text-align: center;
    background-color: #f44;
  }
  .van-cell__title {
    font-size: 16px;
  }
}
</style>