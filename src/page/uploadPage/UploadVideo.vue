<template>
  <div class="uploadVideo">
    <base-header 
      titleTop="上传视频" 
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
      <van-field v-model="valueContent" type="textarea" :border="false" placeholder="请输入简介" autosize/>
      <van-uploader class="photo-wrap" :after-read="onRead">
        <div class="photo-box">
          <div class="upload-text" v-show="show">上传封面</div>
          <img class="photo-detail" :src="photoImg">
        </div>
      </van-uploader>
      <div class="video-upload">
        <el-upload
          class="upload-demo"
          action="http://localhost:3000/upload/upload"
          :before-upload="beforeVideoUpload"
          :on-exceed="handleVideoExceed"
          :on-success="handleVideoSuccess"
          :on-error="handleVideoError"
          :file-list="fileList"
          :limit="1"
          >
          <el-button class="upload-botton" size="small" type="primary">点击上传视频</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
var param = new FormData()
import { formatTimeToStr } from '@/utils/date'
import { postAddIdea } from "@/api/index"
export default {
  name: 'uploadVideo',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      valueTitle: '',
      valueContent: '',
      show: true,
      photoImg: '',
      fileList: [],
      video: '',
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
    beforeVideoUpload(file) {
      const isMP4 = file.type === 'video/mp4'
      if (!isMP4) {
        this.$toast('上传文件只能是 MP4 格式!')
      }
      return isMP4
    },
    handleVideoExceed(files, fileList) {
      this.$toast('只能上传一个文件')
    },
    handleVideoSuccess(res, file) {
      this.video = 'http://localhost:3000/images/upload/' + res[0].filename
    },
    handleVideoError() {
      this.$toast('上传失败')
    },
    onPush() {
      if(this.valueTitle == '' || this.valueContent == '' || this.photoImg == '' || this.video == '') {
        this.$toast('标题、正文、封面或文件不能为空')
      } else {
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        param.append('type', 'video') 
        param.append('author_id', this.$store.state.idData)
        param.append('author', this.$store.state.usernameData) 
        param.append('author_img', this.$store.state.headImgData)
        param.append('author_sex', this.$store.state.sexData)
        param.append('author_introduction', this.$store.state.introductionData)
        param.append('idea_title', this.valueTitle) 
        param.append('idea_content', this.valueContent)
        param.append('idea_file', this.video)
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
.uploadVideo {
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
    .video-upload {
      margin-top: 10px;
      padding: 0 15px;
      .upload-botton {
        background: @base-color;
        border-color: @base-color;
      }
    }
  }
}
</style>
