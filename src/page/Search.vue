<template>
  <div class="search">
    <div class="search-wrap">
      <div class="back-box" @click="toBack">
        <img src="../assets/images/back.png" alt="">
      </div>
      <van-search
        class="search-box"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        show-action
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div class="search-content">
      <div class="search-hot">
        <div class="search-hot-title">热门搜索</div>
        <div 
          class="search-hot-content"
          v-for="(hotSearch, index) in hotSearchList"
          :key="index"
          @click="onPushHot(hotSearch)"
        >{{hotSearch}}</div>
      </div>
      <div class="search-record">
        <div class="search-record-title">搜索记录</div>
        <van-cell 
          class="search-record-content"
          v-for="(recordSearch, index) in recordSearchList" 
          :key="index"
          :title="recordSearch.history_content" 
          center
          @click="onPushHistory(recordSearch.history_content)"
        >
          <img src="../assets/images/close.png" alt="" @click.stop="deleteHistory(recordSearch._id)">
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { postAddHistory } from "@/api/index"
import { postFindAllHistory } from "@/api/index"
import { postDeleteHistory } from "@/api/index"
export default {
  name: 'search',
  data() {
    return {
      searchValue: '',
      hotSearchList: ['遇见晴天', '叫我宫主大人', '知否知否', '沙漠骆驼', '往后余生', '琵琶行'],
      recordSearchList: [],
    }
  },
  mounted() {
    this.findAllHistory()
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },

    //查找所有搜索历史
    findAllHistory() {
      postFindAllHistory().then(res => {
        if(res.success) {
          this.recordSearchList = res.resultList.reverse()
        }
      })
    },

    onSearch() {
      if(this.searchValue != ''){
        //添加历史记录
        postAddHistory({
          history_content: this.searchValue
        }).then(res => {
          if(res.success) {
            this.findAllHistory()
          }
        })

        this.$router.push({
          name: 'searchPage',
          query: {
            idea_title: this.searchValue
          }
        })
      } else {
        this.$toast('请输入搜索内容')
      }
    },

    //点击热门搜索使其到搜索框
    onPushHot(hotSearch) {
      this.searchValue = hotSearch
    },

    //点击搜索历史使其到搜索框
    onPushHistory(history_content) {
      this.searchValue = history_content
    },

    //删除历史记录
    deleteHistory(history_id) {
      postDeleteHistory({
        history_id: history_id
      }).then(res => {
        if(res.success) {
          this.findAllHistory()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .search-wrap {
    width: 100%;
    height: 44px;
    position: relative;
    background: rgb(242, 242, 242);
    .back-box {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .search-box {
      width: 87%;
      position: absolute;
      right: 8px;
    }
  }
  .search-content {
    margin-top: 20px;
    border-top: 1px solid rgb(240, 240, 240);
    .search-hot {
      padding: 5px 15px;
      .search-hot-title {
        margin-bottom: 10px;
        font-size: 12px;
        color: rgb(128, 128, 128);
      }
      .search-hot-content {
        display: inline-block;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 3px;
        margin-top: 5px;
        margin-left: 6px;
        padding: 4px;
        font-size: 13px;
        color: rgb(119, 119, 119);
      }
    }
    .search-record {
      margin-top: 15px;
      .search-record-title {
        font-size: 12px;
        background: rgb(240, 240, 240);
        padding: 5px 15px;
      }
      .search-record-content {
        color: rgb(119, 119, 119);
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>
