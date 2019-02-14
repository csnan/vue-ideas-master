<template>
  <div class="news">
    <base-header titleTop="消息" :rightIcon="searchIcon"></base-header>
    <div class="tab-box-wrap">
      <div class="tab-box">
        <div
          class="tab-item"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="onTabsSwitch(index)"
          v-bind:class="{active:index==nowTabIndex}"
        >{{tab}}</div>
      </div>
    </div>
    <div class="content-news">
      <div class="tab-first" v-show="nowTabIndex===0">
        <van-swipe-cell 
          v-for="(cell, index) in cellList" 
          :key="index" 
          :right-width="65"
        >
          <van-cell-group>
            <van-cell :title="cell.titleText" :label="cell.labelText">
              <div class="head-image" slot="icon">
                <img :src="cell.headImg">
              </div>
              <div>{{cell.valueText}}</div>
              <van-tag class="tag-number" type="danger" round>{{cell.num}}</van-tag>
            </van-cell>
          </van-cell-group>
          <span slot="right" @click="onDelete(index)">删除</span>
        </van-swipe-cell>
      </div>
      <div class="tab-second" v-show="nowTabIndex===1">
        
      </div>
      <div class="tab-third" v-show="nowTabIndex===2">
        
      </div>
      <div class="tab-fourth" v-show="nowTabIndex===3">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data() {
    return {
      searchIcon: require('@/assets/images/search.png'),
      nowTabIndex: 0,
      tabs: ["私信","评论","赞我","通知"],
      cellList: [
        {
          titleText: 'OKOer', 
          labelText: '1111111111111',
          valueText: '16:11',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '321', 
          labelText: '1111111111111',
          valueText: '10:22',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '213', 
          labelText: '1111111111111',
          valueText: '03:11',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '555',
          labelText: '1111111111111',
          valueText: '05:55',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
        {
          titleText: '333', 
          labelText: '1111111111111',
          valueText: '06:44',
          num: '11',
          headImg: require('@/assets/images/1.jpeg')
        },
      ]
    }
  },
  methods: {
    onTabsSwitch(index) {
      this.nowTabIndex = index
    },
    onDelete(index) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.cellList.splice(index, 1)
      }).catch(() => {
      })
    }
  },
}
</script>

<style lang="less" scoped>
.news {
  margin-bottom: 68px;
  .tab-box-wrap {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 46px;
    background: url('../assets/images/bg.png') no-repeat 0px -30px;
    background-size: 100%; 
    z-index: 999;
    .tab-box {
      display: flex;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 95%;
      height: 25px;
      border: 1px solid rgb(0, 0, 0);
      border-radius: 50px;
      overflow: hidden;
      .tab-item{
        flex: 1;
        height: 25px;
        line-height: 27px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: rgb(0, 0, 0);
      }
      .tab-item.active {
        flex: 1;
        height: 25px;
        border-radius: 50px;
        line-height: 27px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: rgb(255, 255, 255);
        background: rgba(160, 160, 160, 0.5);
      }
    }
  }
  .content-news {
    margin-top: 86px;
    .tab-first {
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
    }
  }
}
</style>
<style lang="less">
.news {
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

