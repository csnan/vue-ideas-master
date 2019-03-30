<template>
  <div class="my">
    <base-header 
      :bgColor="'rgba(27, 190, 231,' + opacityNum + ')'"
      :rightIcon="setIcon"
    ></base-header>
    <div
     class="personal-card"
     :style="{ 'background': 'url(' + coverImg + ') center center / 100% no-repeat ' }"
     >
      <div class="head-image">
        <img :src="headImg">
      </div>
    </div>
    <div class="content-my">
      <div class="content-one" v-show="!showOne" @click="toLogin">
        <span class="user-name">点击登录</span>
      </div>
      <div class="content-one" v-show="showOne"  @click="toUserCenter">
        <span class="user-name">{{myName}}</span>
        <img :src="sexIcon" alt="">
      </div>
      <div class="content-two" v-show="showTwo">
        <van-row class="interact-number">
          <van-col span="8"><span @click="toFocusPage">{{focusNum}}</span></van-col>
          <van-col span="8">0</van-col>
          <van-col span="8">0</van-col>
        </van-row>
        <van-row class="interact-name">
          <van-col span="8"><span @click="toFocusPage">关注</span></van-col>
          <van-col span="8">粉丝</van-col>
          <van-col span="8">访客</van-col>
        </van-row>
      </div>
      <div class="content-three">
        <van-row>
          <van-col span="6">
            <div>
              <img src="../assets/images/vip.png">
            </div>
            <div>VIP</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/collection.png">
            </div>
            <div>收藏</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/service.png">
            </div>
            <div>服务</div>
          </van-col>
          <van-col span="6">
            <div>
              <img src="../assets/images/history.png">
            </div>
            <div>足迹</div>
          </van-col>
        </van-row>
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
            <my-updatings></my-updatings>
          </div>
          <div class="tab-second" v-show="active === 1">
            <my-works></my-works>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import myUpdatings from './myPage/MyUpdatings'
import myWorks from './myPage/MyWorks'
import { postObtainUserInfo } from "@/api/index"
export default {
  name: 'my',
  components: {
    myUpdatings,
    myWorks
  },
  data() {
    return {
      opacityNum: 0,
      setIcon: require('@/assets/images/set.png'),
      coverImg: this.$store.state.coverImgData,
      headImg: this.$store.state.headImgData,
      myName: this.$store.state.usernameData,
      sex: this.$store.state.sexData,
      sexIcon: '',
      introduction: this.$store.state.introductionData,
      showOne: this.$store.state.memberData,
      showTwo: this.$store.state.memberData,
      active: 0,
      tabList: [ '动态', '作品' ],
      focusNum: this.$store.state.focusNumData
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onHandleScroll)
    if(this.sex == 'male') {
      this.sexIcon = require('@/assets/images/male.png')
    } else {
      this.sexIcon = require('@/assets/images/female.png')
    }
    if(this.$store.state.memberData) {
      this.getUserInformation()
    }
  },
  methods: {
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

    //根据用户id获取用户个人信息
    getUserInformation() {
      postObtainUserInfo({
        _id: this.$store.state.idData
      }).then(res => {
        if(res.success) {
          if(res.resultList.headImg) {
            this.headImg = res.resultList.headImg
            this.$store.state.headImgData = res.resultList.headImg
          }

          if(res.resultList.coverImg) {
            this.coverImg = res.resultList.coverImg
            this.$store.state.coverImgData = res.resultList.coverImg
          }

          if(res.resultList.username) {
            this.myName = res.resultList.username
            this.$store.state.usernameData = res.resultList.username
          }

          if(res.resultList.sex) {
            this.$store.state.sexData = res.resultList.sex
            if(res.resultList.sex == 'female') {
              this.sexIcon = require('@/assets/images/female.png')
            } else {
              this.sexIcon = require('@/assets/images/male.png')
            }
          }

          if(res.resultList.introduction) {
            this.introduction = res.resultList.introduction
            this.$store.state.introductionData = res.resultList.introduction
          }
        }
      })
    },
    
    toLogin() {
      this.$router.push('/login')
    },
    toUserCenter() {
      this.$router.push('/userCenter')
    },
    toFocusPage() {
      this.$router.push('/focusPage') 
    }
  },
}
</script>

<style lang="less" scoped>
.my{
  .personal-card {
    height: 180px;
    position: relative;
    z-index: 1;
  }
  .personal-card::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }
  .head-image {
    width: 80px;
    height: 80px;
    position: absolute;
    margin-top: 139px;
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
  .content-my {
    .content-one{
      height: 50px;
      .user-name {
        margin-left: 110px;
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
      text-align: center;
      .interact-number {
        font-size: 18px;
      }
      .interact-name {
        margin-top: 5px;
        font-size: 10px;
        color: rgb(180, 180, 180);
      }
    }
    .content-three {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      font-size: 10px;
      color: rgb(82, 95, 110);
      img {
        width: 40px;
        height: 40px;
      }
    }
    .gray-block {
      height: 10px;
      background: rgb(240, 240, 240);
    }
    .tab-box {
      .tab-first {
        padding: 5px 0px;
        margin-bottom: 68px;
      }
      .tab-second {
        padding: 5px 0px;
        margin-bottom: 68px;
      }
    }
  }
}
</style>
<style lang="less">
.my {
  .van-tab--active {
    color: @base-color;
  }
}
</style>
