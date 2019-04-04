<template>
  <div class="uploadPhoto">
    <base-header 
      titleTop="上传图片" 
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
      <div class="photo-upload">
        <el-upload
          action="http://localhost:3000/upload/upload"
          list-type="picture-card"
          accept="image/*"
          :on-preview="handlePictureCardPreview"
          :on-exceed="handlePictureExceed"
          :on-success="handlePictureSuccess"
          :on-error="handlePictureError"
          :limit="9"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeToStr } from '@/utils/date'
import { postAddPhoto } from "@/api/index"
export default {
  name: 'uploadPhoto',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      valueTitle: '',
      valueContent: '',
      dialogImageUrl: '',
      dialogVisible: false,
      photo: '',
      photoList: [],
      currentDate: '',
      pass: false
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureExceed(files, fileList) {
      this.$toast('只能上传九张图片')
    },
    handlePictureSuccess(res, file) {
      this.photo = 'http://localhost:3000/images/upload/' + res[0].filename
      this.photoList.push(this.photo)
    },
    handlePictureError() {
      this.$toast('上传失败')
    },
    onPush() {
      if(this.valueTitle == '' || this.valueContent == '' || this.photoList == '') {
        this.$toast('标题、简介或图片不能为空')
      } else if (this.photoList.length < 3) {
        this.$toast('至少上传三张图片')
      } else {
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        postAddPhoto({
          type: 'photo',
          author_id: this.$store.state.idData,
          author: '',
          author_img: '',
          idea_title: this.valueTitle,
          idea_content: this.valueContent,
          idea_img: '',
          idea_images: this.photoList,
          idea_time: this.currentDate,
          pass: this.pass
        }).then(res => {
          if(res.success) {
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
.uploadPhoto {
  .main-content {
    .title-box {
      font-size: 18px;
    }
    .photo-upload {
      padding: 0 15px;
    }
  }
}
</style>
