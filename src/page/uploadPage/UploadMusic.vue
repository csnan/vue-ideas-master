<template>
  <div class="uploadMusic">
    <base-header titleTop="上传音乐" :leftLogo="false" :leftIcon="backIcon" :rightIcon="completeIcon" @goBack="toBack" ></base-header>
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
      <div class="music-upload">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :limit="1"
          >
          <el-button class="upload-botton" size="small" type="primary">点击上传音乐</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp3文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploadMusic',
  data() {
    return {
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      valueTitle: '',
      valueContent: '',
      show: true,
      photoImg: '',
      fileList: []
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onRead(file) {
      this.show = false
      this.photoImg = file.content
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="less" scoped>
.uploadMusic {
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
    .music-upload {
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
