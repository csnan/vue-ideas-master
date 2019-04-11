<template>
  <div id="login">
    <base-header 
      :leftLogo="false" 
      :leftIcon="closeIcon"
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
    <div class="form-login">
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
        type="password"
        placeholder="请输入密码"
        @focus="onPasswordLight"
        @blur="onPasswordDark"
      />
      <div class="self-service">
        <span class="forgot-password" @click="toForgetPasswordFirst">忘记密码</span>
        <span class="immediate-register" @click="toRegister">立即注册</span>
      </div>
      <van-button @click="onLogin">登录</van-button>
    </div>
    <div class="foot-login">
      <div class="tag-warn">或从以下方式登录</div>
      <van-row class="login-logo">
        <van-col span="8">
          <img src="../assets/images/qq.png">
        </van-col>
        <van-col span="8">
          <img src="../assets/images/wechat.png">
        </van-col>
        <van-col span="8">
          <img src="../assets/images/weibo.png">
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { postLogin } from "@/api/index"
var h = window.innerHeight
export default {
  name: 'login',
  data() {
    return {
      closeIcon: require('@/assets/images/close.png'),
      isUserLight: false,
      isPasswordLight: false,
      userId: '',
      password: ''
    }
  },
  mounted() {
    var login = document.getElementById('login')
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onUserLight() {
      this.isUserLight = true
      login.style.height = h + 'px'
    },
    onUserDark() {
      this.isUserLight = false
    },
    onPasswordLight() {
      this.isPasswordLight = true
      login.style.height = h + 'px'
    },
    onPasswordDark() {
      this.isPasswordLight = false
    },
    toForgetPasswordFirst() {
      this.$router.push('/forgetPasswordFirst')
    },
    toRegister() {
      this.$router.push('/register')
    },
    onLogin () {
      if (this.userId == '') {
        this.$toast('手机号不能为空')
      } else if (this.password == '') {
        this.$toast('密码不能为空')
      } else {
        postLogin({
          userId: this.userId,
          password: this.password
        }).then(res => {
          if (res.success) {
            if(res.resultList.length == 0) {
              this.$toast('请输入正确的用户名和密码')
            } else {
              this.$store.state.idData = res.resultList[0]._id
              this.$store.state.userIdData = res.resultList[0].userId
              this.$store.state.usernameData = res.resultList[0].username
              this.$store.state.headImgData = res.resultList[0].headImg
              this.$store.state.coverImgData = res.resultList[0].coverImg
              this.$store.state.sexData = res.resultList[0].sex
              this.$store.state.introductionData = res.resultList[0].introduction
              this.$store.state.focusData = res.resultList[0].focus_id
              this.$store.state.focusNumData = res.resultList[0].focus_id.length
              this.$store.state.collectionData = res.resultList[0].collection_id
              this.$store.commit('loginMemberData')
              this.$toast.success('登陆成功')
              this.$router.push('/my')
            }
          }
        })
      }
      // } else if (this.userId == this.$store.state.userIdData && this.password == this.$store.state.passwordData) {
      //   this.$store.commit('upDateMemberData')
      //   this.$toast.success('登陆成功')
      //   this.$router.push('/home')
      // } else {
      //   this.$toast('请输入正确的用户名和密码')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
#login{
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
  .form-login {
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
    .self-service {
      margin-top: 10px;
      font-size: 13px;
      color: rgb(94, 94, 94);
      .forgot-password{
        float: left;
      }
      .immediate-register{
        float: right;
      }
    }
    .van-button {
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
  .foot-login {
    width: 90%;
    position: absolute;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgb(226, 226, 226);
    .tag-warn{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      margin-top: -9px;
      font-size: 13px;
      color: rgb(156, 156, 156);
      background-color: rgb(255, 255, 255);
      padding: 0 10px;
    }
    .login-logo{
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>

