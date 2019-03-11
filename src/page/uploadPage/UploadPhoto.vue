<template>
  <div class="uploadPhoto">
    <base-header titleTop="上传图片" :leftLogo="false" :leftIcon="backIcon" :rightIcon="completeIcon" @goBack="toBack" ></base-header>
    <div class="main-content">
      <van-cell-group>
        <van-field class="title-box" v-model="valueTitle" placeholder="请输入标题" />
      </van-cell-group>
      <van-field v-model="valueContent" type="textarea" :border="false" placeholder="请输入简介" autosize/>
      <div class="photo-upload">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePictureSuccess"
          :on-error="handlePictureError"
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
export default {
  name: 'uploadPhoto',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      valueTitle: '',
      valueContent: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureSuccess(res, file) {
    },
    handlePictureError() {
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
