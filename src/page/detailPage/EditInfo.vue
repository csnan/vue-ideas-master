<template>
  <div class="editInfo">
    <base-header 
      titleTop="编辑个人资料" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      @goBack="toBack"
    ></base-header>
    <div class="main-content">
      <div class="gray-block"></div>
      <van-cell-group>
        <van-cell title="头像" center>
          <van-uploader accept="image/*" :after-read="onReadHeadImg">
            <div class="head-image">
              <img :src="headImg" alt="">
            </div>
          </van-uploader>
        </van-cell>
        <van-cell title="个人主页背景" center>
          <van-uploader accept="image/*" :after-read="onReadCoverImg">
            <div class="cover-image">
              <img :src="coverImg" alt="">
            </div>
          </van-uploader>
        </van-cell>
      </van-cell-group>
      <div class="gray-block"></div>
      <van-cell-group>
        <van-field v-model="myName" label="昵称" input-align="right" />
        <van-cell title="性别" center>
          <van-radio-group class="radio-box" v-model="sex">
            <van-radio class="radio-content" name="male">男</van-radio>
            <van-radio class="radio-content" name="female">女</van-radio>
          </van-radio-group>
        </van-cell>
      </van-cell-group>
      <div class="gray-block"></div>
      <div class="my-introduction-box">
        <div class="my-introduction-title">个人简介</div>
        <div>
          <van-cell-group>
            <van-field
              v-model="introduction"
              type="textarea"
              placeholder="请输入个人简介"
              rows="3"
              autosize
            />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postObtainUserInfo } from "@/api/index"
import { postUpdateUserInfo } from "@/api/index"
import { postUpdateHeadImg } from "@/api/index"
import { postUpdateCoverImg } from "@/api/index"
export default {
  name: 'editInfo',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      headImg: this.$store.state.headImgData,
      coverImg: this.$store.state.coverImgData,
      myName: this.$store.state.usernameData,
      sex: this.$store.state.sexData,
      introduction: this.$store.state.introductionData
    }
  },
  mounted() {

  },
  methods: {
    toBack() {

      //修改个人资料并上传到数据库
      postUpdateUserInfo({
        _id: this.$store.state.idData,
        username: this.myName,
        sex: this.sex,
        introduction: this.introduction
      }).then(res => {
        if(res.success) {
          this.$store.state.usernameData = res.resultList.username
          this.$store.state.sexData = res.resultList.sex
          this.$store.state.introductionData = res.resultList.introduction
          this.$toast('修改成功')
          this.$router.go(-1)
        }
      })
    },

    //修改用户头像并上传到数据库
    onReadHeadImg(file) {
      this.headImg = file.content
      let param = new FormData() // 创建form对象
      let _id = this.$store.state.idData
      param.append('file', file.file) 
      param.append('_id', _id) 
      postUpdateHeadImg(param).then(res => {
        if(res.success) {
          this.$store.state.headImgData = res.resultList.headImg
        }
      })
    },

    //修改个人主页背景并上传到数据库
    onReadCoverImg(file) {
      this.coverImg = file.content
      let param = new FormData() // 创建form对象
      let _id = this.$store.state.idData
      param.append('file', file.file) 
      param.append('_id', _id) 
      postUpdateCoverImg(param).then(res => {
        if(res.success) {
          this.$store.state.coverImgData = res.resultList.coverImg
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editInfo {
  .main-content {
    .gray-block {
      height: 15px;
      background: rgb(240, 240, 240);
    }
    .head-image {
      width: 50px;
      height: 50px;
      position: relative;
      float: right;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .cover-image {
      width: 130px;
      height: 80px;
      position: relative;
      float: right;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .radio-box {
      .radio-content {
        display: inline-block;
      }
    }
    .my-introduction-box {
      .my-introduction-title {
        padding: 10px 15px 0 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
