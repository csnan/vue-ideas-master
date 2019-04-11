<template>
  <div class="uploadArticle">
    <base-header 
      titleTop="上传文章" 
      :leftLogo="false" 
      :leftIcon="backIcon" 
      :rightIcon="completeIcon" 
      @goBack="toBack" 
      @toPage="onPush"
    ></base-header>
    <div class="main-content">
      <van-cell-group>
        <van-field class="title-box" v-model="valueTitle" placeholder="请输入标题" />
      </van-cell-group>
      <van-field v-model="valueContent" type="textarea" :border="false" placeholder="请输入正文" autosize/>
      <van-uploader class="photo-wrap" :after-read="onRead">
        <div class="photo-box">
          <div class="upload-text" v-show="show">上传封面</div>
          <img class="photo-detail" :src="photoImg">
        </div>
      </van-uploader>
    </div>
  </div>
</template>

<script>
var param = new FormData()
import { formatTimeToStr } from '@/utils/date'
import { postAddIdea } from "@/api/index"
export default {
  name: 'uploadArticle',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      valueTitle: '',
      valueContent: '',
      show: true,
      photoImg: '',
      currentDate: '',
      pass: false
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onRead(file) {
      param = new FormData()
      this.show = false
      this.photoImg = file.content
      param.append('file', file.file) 
    },
    onPush() {
      if(this.valueTitle == '' || this.valueContent == '' || this.photoImg == '') {
        this.$toast('标题、正文或封面不能为空')
      } else {
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        param.append('type', 'article')
        param.append('author_id', this.$store.state.idData)
        param.append('author_phone', this.$store.state.userIdData)
        param.append('author', '') 
        param.append('author_img', '')
        param.append('idea_title', this.valueTitle) 
        param.append('idea_content', this.valueContent)
        param.append('idea_time', this.currentDate)
        param.append('pass', this.pass)
        postAddIdea(param).then(res => {
          if(res.success) {
            param = new FormData()  //清空FormData数据
            this.$toast('发布成功，请等待审核')
            this.$router.push('/home')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.uploadArticle {
  .main-content {
    .title-box {
      font-size: 18px;
    }
    .photo-wrap {
      padding: 0 15px;
      .photo-box {
        width: 150px;
        height: 150px;
        position: relative;
        border: 1px dashed rgb(196, 196, 196);
        border-radius: 5px;
        overflow: hidden;
        .upload-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgb(168, 168, 168);
        }
        .photo-detail {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
      }
    }
  }
}
</style>
