<template>
  <div class="userCenter">
    <base-header 
      titleTop="个人主页" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      :bgColor="'rgba(27, 190, 231,' + opacityNum + ')'"
      @goBack="toBack" 
    ></base-header>
    <div
     class="personal-card"
     :style="{ 'background': 'url(' + coverImg + ') center center / 100% no-repeat ' }"
     >
      <div class="head-image">
        <img :src="headImg">
      </div>
    </div>
    <div class="content-userCenter">
      <div class="content-wrap">
        <div class="content-one">
          <span class="user-name">{{myName}}</span>
          <img :src="sexIcon" alt="">
        </div>
        <div class="content-two">
          <van-row class="interact-number">
            <van-col span="8">{{focusNum}}</van-col>
            <van-col span="8">0</van-col>
            <van-col span="8">0</van-col>
          </van-row>
          <van-row class="interact-name">
            <van-col span="8">关注</van-col>
            <van-col span="8">粉丝</van-col>
            <van-col span="8">人气</van-col>
          </van-row>
        </div>
      </div>
      <div class="my-introduction">
        <div class="introduction-title">个人简介</div>
        <div class="introduction-content">{{introduction}}</div>
      </div>
      <div class="edit-button-box" v-show="showEdit">
        <van-button class="edit-button" size="normal" @click="toEditInfo">
          <img src="../../assets/images/edit2.png" alt="">
          <span>编辑个人资料</span>
        </van-button>
      </div>
      <div class="gray-block"></div>
      <van-tabs
        class="tab-box" 
        v-model="active" 
        :offset-top="45" 
        :line-width="30" 
        color="#1BBEE7" 
        sticky 
        animated 
        swipeable
      >
        <van-tab 
          v-for="(tab, index) in tabList"
          :key="index" 
          :title="tab"
        >
          <div class="tab-first" v-show="active === 0">
            <my-updatings :author_id="author_id"></my-updatings>
          </div>
          <div class="tab-second" v-show="active === 1">
            <my-works :author_id="author_id"></my-works>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import myUpdatings from '../myPage/MyUpdatings'
import myWorks from '../myPage/MyWorks'
import { postObtainUserInfo } from "@/api/index"
export default {
  name: 'userCenter',
  components: {
    myUpdatings,
    myWorks
  },
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      opacityNum: 0,
      coverImg: '',
      active: 0,
      showEdit: false,
      author_id: '',
      tabList: [ '动态', '作品' ],
      headImg: '',
      myName: '',
      sex: '',
      sexIcon: '',
      introduction: '',
      focusNum: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onHandleScroll)
    this.getUserInformation()
  },
  methods: {
    toBack() {
      if(this.$route.query.author_id == this.$store.state.idData) {
        this.$router.push('/my')
      } else {
        this.$router.go(-1)
      }
    },
    //滚动时顶部导航背景透明度变化
    onHandleScroll() {
      //var headerTop = document.getElementById('headerTop')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 0 && scrollTop <= 180) {
        this.opacityNum = scrollTop/180
      } else if (scrollTop > 180) {
        this.opacityNum = 1
      } else {
        this.opacityNum = 0
      }
    },
    
    toEditInfo() {
      this.$router.push('/editInfo')
    },

    //根据用户id获取用户个人信息
    getUserInformation() {
      if(!this.$route.query.author_id || this.$route.query.author_id == this.$store.state.idData) {
        this.showEdit = true
        this.author_id = this.$store.state.idData
        postObtainUserInfo({
          _id: this.$store.state.idData
        }).then(res => {
          if(res.success) {
              this.headImg = res.resultList.headImg
              this.coverImg = res.resultList.coverImg
              this.myName = res.resultList.username
              if(res.resultList.sex == 'female') {
                this.sexIcon = require('@/assets/images/female.png')
              } else {
                this.sexIcon = require('@/assets/images/male.png')
              }
              this.introduction = res.resultList.introduction
              this.focusNum = res.resultList.focus_id.length
          }
        })
      } else {
        this.author_id = this.$route.query.author_id
        postObtainUserInfo({
          _id: this.$route.query.author_id
        }).then(res => {
          if(res.success) {
            this.headImg = res.resultList.headImg
            this.coverImg = res.resultList.coverImg
            this.myName = res.resultList.username
            if(res.resultList.sex == 'female') {
              this.sexIcon = require('@/assets/images/female.png')
            } else {
              this.sexIcon = require('@/assets/images/male.png')
            }
            this.introduction = res.resultList.introduction
            this.focusNum = res.resultList.focus_id.length
          }
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.userCenter {
  .personal-card {
    height: 180px;
    position: relative;
    z-index: 1;
  }
  // .personal-card::after {
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   background: inherit;
  //   filter: blur(2px);
  //   z-index: 2;
  // }
  .head-image {
    width: 80px;
    height: 80px;
    position: absolute;
    margin-top: 160px;
    margin-left: 15px;
    border-radius: 50%;
    border: 2px solid #FFF;
    overflow: hidden;
    z-index: 3;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content-userCenter {
    .content-wrap {
      margin-left: 110px;
      .content-one {
        height: 50px;
        .user-name {
          line-height: 50px;
          font-size: 18px;
          vertical-align: middle;
        }
        img {
          width: 15px;
          height: 15px;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .content-two {
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(240, 240, 240);
        .interact-number {
          font-size: 18px;
        }
        .interact-name {
          margin-top: 5px;
          font-size: 10px;
          color: rgb(180, 180, 180);
        }
      }
    }
    .my-introduction {
      padding: 10px 15px;
      .introduction-title {
        font-size: 14px;
      }
      .introduction-content {
        margin-top: 5px;
        font-size: 14px;
        color: rgb(128, 128, 128);
      }
    }
    .edit-button-box {
      padding: 10px 15px;
      .edit-button {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: @base-color;
        border: 1px solid @base-color;
        font-size: 12px;
        img {
          width: 12px;
          height: 12px;
          vertical-align: middle;
        }
        span {
          margin-left: 5px;
          vertical-align: middle;
        }
      }
    }
    .gray-block {
      height: 10px;
      background: rgb(240, 240, 240);
    }
    .tab-box {
      .tab-first {
        padding: 5px 0px;
      }
      .tab-second {
        padding: 5px 0px;
      }
    }
  }
}
</style>
<style lang="less">
.userCenter {
  .van-tab--active {
    color: @base-color;
  }
}
</style>