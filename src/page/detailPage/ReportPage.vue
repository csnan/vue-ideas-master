<template>
  <div class="reportPage">
    <base-header :titleTop="titleName" :leftLogo="false" :leftIcon="backIcon" :rightIcon="completeIcon"  @goBack="toBack" @toPage="onPush"></base-header>
    <div class="main-content">
      <div class="report-content">
        <div class="report-title">请选择举报类别</div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="广告或垃圾信息" clickable @click="onCheck('1')">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="抄袭或转载" clickable @click="onCheck('2')">
              <van-radio name="2" />
            </van-cell>
            <van-cell title="其他" clickable @click="onCheck('3')">
              <van-radio name="3" />
            </van-cell>
            <van-field
              v-model="reportContent"
              type="textarea"
              :placeholder="placeholderContent"
              rows="6"
              autosize
            />
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeToStr } from '@/utils/date'
import { postAddReport } from "@/api/index"
export default {
  name: 'reportPage',
  data() {
    return {
      titleName: '举报',
      backIcon: require('@/assets/images/back2.png'),
      completeIcon: require('@/assets/images/complete.png'),
      radio: '1',
      placeholderContent: '请输入举报具体原因',
      reportContent: '',
      currentDate: ''
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onCheck(checked) {
      this.radio = checked
      if(checked == '2') {
        this.placeholderContent = '请输入举报具体原因和原文链接'
      } else {
        this.placeholderContent = '请输入举报具体原因'
      }
    },
    onPush() {
      if(this.reportContent == '') {
        this.$toast('请输入举报具体原因')
      } else {
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        postAddReport({
          user_phone: this.$store.state.userIdData,
          idea_id: this.$route.query.idea_id,
          idea_title: this.$route.query.idea_title,
          report_type: this.radio,
          report_content: this.reportContent,
          report_time: this.currentDate
        }).then(res => {
          if(res.success) {
            this.$toast('感谢您的举报，我们会尽快处理！')
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reportPage {
  .main-content {
    .report-title {
      padding: 15px;
      font-size: 12px;
      color: rgb(246, 131, 12);
    }
  }
}
</style>
