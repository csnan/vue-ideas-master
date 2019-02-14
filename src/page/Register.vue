<template>
  <div id="register">
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
    <div class="form-register">
      <van-field
        :class="isUserLight ? 'van-field2' : 'van-field'"
        v-model="username"
        icon="question-o"
        placeholder="请输入用户名"
        @focus="onUserLight"
        @blur="onUserDark"
        @click-icon="$toast('question')"
        clearable
      />
      <br>
      <van-field
        :class="isPasswordLight ? 'van-field2' : 'van-field'"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        @focus="onPasswordLight"
        @blur="onPasswordDark"
      />
      <br>
      <van-field
        class="code-box"
        :class="isCodeLight ? 'van-field2' : 'van-field'"
        v-model="code"
        type="number"
        placeholder="请输入验证码"
        @focus="onCodeLight"
        @blur="onCodeDark"
      />
      <div class="get-code" @click="getCode">{{getTimeNum}}</div>
      <van-button class="register-button">注册</van-button>
      <van-checkbox v-model="checked" class="select-box">
        <span>我已阅读并同意：</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.checked ? selectIcon.active : selectIcon.normal"
        >
      </van-checkbox>
      <div class="foot-text">
        <span>《ideas用户服务协议》</span>
        及
        <span>《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script>
var h = window.innerHeight
export default {
  name: 'register',
  data() {
    return {
      backIcon: require('@/assets/images/back.png'),
      isUserLight: false,
      isPasswordLight: false,
      isCodeLight: false,
      username: '',
      password: '',
      code: '',
      getTimeNum: '获取验证码',
      timer: null,
      checked: true,
      selectIcon: {
        normal: require('@/assets/images/selectBox1.png'),
        active: require('@/assets/images/selectBox2.png')
      }
    }
  },
  mounted() {
    var register = document.getElementById('register')
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onUserLight() {
      this.isUserLight = true
      register.style.height = h + 'px'
    },
    onUserDark() {
      this.isUserLight = false
    },
    onPasswordLight() {
      this.isPasswordLight = true
      register.style.height = h + 'px'
    },
    onPasswordDark() {
      this.isPasswordLight = false
    },
    onCodeLight() {
      this.isCodeLight = true
      register.style.height = h + 'px'
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
    }
  }
}
</script>

<style lang="less" scoped>
#register{
  position: absolute;
  width: 100%;
  height: 100%;
  .particles-js {
    background: url('../assets/images/bg.png') no-repeat;
    background-size: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .form-register {
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
    .register-button {
      width: 100%;
      margin-top: 15px;
      background-color: rgba(27, 190, 231, 0.8);
      color: rgb(255, 255, 255);
      letter-spacing: 8px;
      font-size: 15px;
      box-shadow: 0px 2px 10px #bbbbbb;
      border: none;
    }
    .select-box {
      margin-top: 10px;
      font-size: 14px;
      span {
        color: #919191;
      }
      img {
        width: 17px;
        height: 17px;
      }
    }
    .foot-text {
      margin-top: 5px;
      margin-left: -5px;
      font-size: 11px;
      span {
        color: rgb(27, 190, 231);
      }
    }
  }
}
</style>

