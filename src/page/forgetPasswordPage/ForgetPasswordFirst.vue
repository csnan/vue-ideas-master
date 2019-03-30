<template>
  <div id="forgetPasswordFirst">
    <base-header 
      :leftLogo="false" 
      :leftIcon="backIcon"
      @goBack="toBack" 
      bgColor="rgba(27, 190, 231, 0)"
    ></base-header>
    <vue-particles
      class="particles-js"
      color="#FFB6C1"
      :particleOpacity="0.4"
      linesColor="#E6E6FA"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="form-forgetPasswordFirst">
      <van-field
        :class="isUserLight ? 'van-field2' : 'van-field'"
        v-model="userId"
        type="tel"
        placeholder="请输入手机号"
        @focus="onUserLight"
        @blur="onUserDark"
        clearable
      />  
      <br>
      <van-field
        class="code-box"
        :class="isCodeLight ? 'van-field2' : 'van-field'"
        v-model="codeNum"
        type="number"
        placeholder="请输入验证码"
        @focus="onCodeLight"
        @blur="onCodeDark"
      />
      <div class="get-code" @click="getCode">{{getTimeNum}}</div>
      <van-button class="forgetPasswordFirst-button" @click="toForgetPasswordSecond">下一步</van-button>
    </div>
  </div>
</template>

<script>
var h = window.innerHeight
export default {
  name: 'forgetPasswordFirst',
  data() {
    return {
      backIcon: require('@/assets/images/back.png'),
      isUserLight: false,
      isCodeLight: false,
      userId: '',
      codeNum: '',
      getTimeNum: '获取验证码',
      timer: null
    }
  },
  mounted() {
    var forgetPasswordFirst = document.getElementById('forgetPasswordFirst')
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onUserLight() {
      this.isUserLight = true
      forgetPasswordFirst.style.height = h + 'px'
    },
    onUserDark() {
      this.isUserLight = false
    },
    onCodeLight() {
      this.isCodeLight = true
      forgetPasswordFirst.style.height = h + 'px'
    },
    onCodeDark() {
      this.isCodeLight = false
    },
    getCode() {
      if(this.getTimeNum == '获取验证码' || this.getTimeNum == '重新发送') {
        let count = 60
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if(count > 0 && count <= 60) {
            count--
            this.getTimeNum = '重新发送' + count + '(s)'
          } else {
            this.getTimeNum = '重新发送'
            clearInterval(this.timer)
            this.timer = null
          }
        },1000)
      }
    },
    toForgetPasswordSecond() {
      if (this.userId == '') {
        this.$toast('手机号不能为空')
      } else if (!(/^1[34578]\d{9}$/.test(this.userId))) {
        this.$toast('请输入正确的手机号码格式')
      } else if (this.codeNum == '') {
        this.$toast('验证码不能为空')
      } else {
        this.$router.push({
          name: 'forgetPasswordSecond',
          query: {
            userId: this.userId
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#forgetPasswordFirst{
  position: absolute;
  width: 100%;
  height: 100%;
  .particles-js {
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .form-forgetPasswordFirst {
    width: 90%;
    position: relative;
    margin: 120px auto;
    .van-field {
      border: 1px solid rgb(226, 226, 226);
      background-color: rgba(255, 255, 255, 0.8);
    }
    .van-field2 {
      border: 1px solid @base-color;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .code-box{
      width: 60%;
      float: left;
    }
    .get-code{
      width: 35%;
      height: 44px;
      float: right;
      border: 1px solid @base-color;
      text-align: center;
      line-height: 44px;
      color: @base-color;
      font-size: 14px;
      background-color: rgba(255, 255, 255, 0);
    }
    .get-code:active {
      width: 35%;
      height: 44px;
      float: right;
      border: 1px solid @base-color;
      text-align: center;
      line-height: 44px;
      color: @base-color;
      font-size: 14px;
      background-color: rgba(27, 190, 231, 0.1);
    }
    .forgetPasswordFirst-button {
      width: 100%;
      margin-top: 15px;
      background-color: rgba(27, 190, 231, 0.8);
      color: rgb(255, 255, 255);
      letter-spacing: 8px;
      font-size: 15px;
      box-shadow: 0px 2px 10px #bbbbbb;
      border: none;
    }
  }
}
</style>
