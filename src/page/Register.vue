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
        v-model="userId"
        type="tel"
        placeholder="请输入手机号"
        @focus="onUserLight"
        @blur="onUserDark"
        clearable
      />
      <br>
      <van-field
        :class="isPasswordLight ? 'van-field2' : 'van-field'"
        v-model="password"
        icon="question-o"
        type="password"
        placeholder="请输入密码"
        @click-icon="$toast('密码为6-16位，可为数字、大小写字母或下划线和减号')"
        @focus="onPasswordLight"
        @blur="onPasswordDark"
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
      <van-button class="register-button" @click="onRegister">注册</van-button>
      <van-checkbox v-model="checked" class="select-box">
        <span>我已阅读并同意：</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.checked ? selectIcon.active : selectIcon.normal"
        >
      </van-checkbox>
      <div class="foot-text">
        <span @click="onOpenAgreement">《IDEAS用户服务协议》</span>
        及
        <span @click="onOpenPolicy">《隐私政策》</span>
      </div>
      <van-popup v-model="showAgreement" position="right" :overlay="false">
        <user-agreement @close="onCloseAgreement"></user-agreement>
      </van-popup>
      <van-popup v-model="showPolicy" position="right" :overlay="false">
        <user-policy @close="onClosePolicy"></user-policy>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { formatTimeToStr } from '@/utils/date'
import { postRegister } from "@/api/index"
import userAgreement from './detailPage/UserAgreement'
import userPolicy from './detailPage/UserPolicy'
var h = window.innerHeight
export default {
  name: 'register',
  components: {
    userAgreement,
    userPolicy
  },
  data() {
    return {
      backIcon: require('@/assets/images/back.png'),
      isUserLight: false,
      isPasswordLight: false,
      isCodeLight: false,
      userId: '',
      password: '',
      codeNum: '',
      getTimeNum: '获取验证码',
      timer: null,
      checked: true,
      selectIcon: {
        normal: require('@/assets/images/selectBox1.png'),
        active: require('@/assets/images/selectBox2.png')
      },
      showAgreement: false,
      showPolicy: false,
      currentDate: ''
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
    },
    onOpenAgreement() {
      this.showAgreement = true
    },
    onCloseAgreement() {
      this.showAgreement = false
    },
    onOpenPolicy() {
      this.showPolicy = true
    },
    onClosePolicy() {
      this.showPolicy = false
    },
    onRegister() {
      if (this.userId == '') {
        this.$toast('手机号不能为空')
      } else if (!(/^1[34578]\d{9}$/.test(this.userId))) {
        this.$toast('请输入正确的手机号码格式')
      } else if (this.password == '') {
        this.$toast('密码不能为空')
      } else if (!(/^[\w_-]{6,16}$/.test(this.password))) {
        this.$toast('请输入正确的密码格式')
      } else if (this.codeNum == '') {
        this.$toast('验证码不能为空')
      } else if (!this.checked) {
        this.$toast('请同意用户协议与政策')
      } else {
        // this.$store.state.userIdData = this.userId
        // this.$store.state.passwordData = this.password
        // this.$toast.success('注册成功')
        // this.$router.push('/login')
        let date = new Date()
        this.currentDate =  formatTimeToStr( date, "yyyy-MM-dd hh:mm" )
        postRegister({
          userId: this.userId,
          password: this.password,
          register_time: this.currentDate
        }).then(res => {
          if (res.success) {
            if(res.status == 0) {
              this.$toast.fail('用户名已存在')
            }
            if(res.status == 1) {
              this.$toast.success('注册成功')
              this.$router.push('/login')
            }
          }
        })
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
<style lang="less">
#register{
  .van-popup {
    width: 100%;
    height: 100%;
  }
}
</style>
